import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ActionFunctionArgs, json, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAxios, getQueryClient } from './clients';

interface RegisterFormValues {
  user_email: string;
  user_password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

const registerUser = async (data: RegisterFormValues) => {
  const response = await getAxios().post('/user/register', data);
  return response.data;
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const client: QueryClient = getQueryClient();
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as RegisterFormValues;

  try {
    await registerUser(data);

    await client.invalidateQueries({ queryKey: ['user'] });

    toast.success('Registreringen lyckades, vänligen logga in!');

    return redirect('/medlem/logga-in');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return json({ error: error.response.data.message }, { status: 400 });
    }

    return json({ error: 'Registrering misslyckades' }, { status: 400 });
  }
};
