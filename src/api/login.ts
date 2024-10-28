import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { LoginFormData } from '../pages/loginpage/LoginPage';
import { getAxios } from './clients';

const login = async (data: LoginFormData) =>
  await getAxios().post('user', data);

// ActionFunctionArgs also include params key if needed
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
        return error.response.data.message;
      }
      return 'Inloggning misslyckades';
    }
  };
