import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ActionFunctionArgs, json, redirect } from 'react-router-dom';
import { LoginFormData } from '../pages/loginpage/LoginPage';
import { getAxios } from './clients';

const login = async (data: LoginFormData) =>
  await getAxios().post('user', data);

export const loginAction =
  (client: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as unknown as LoginFormData;

    try {
      await login(data);
      await client.invalidateQueries({ queryKey: ['user'] });
      return redirect('/'); // Redirect to the home page after successful login
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return json({ error: error.response.data.message }, { status: 400 });
      }
      return json({ error: 'Inloggning misslyckades' }, { status: 400 });
    }
  };
