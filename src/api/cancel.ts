import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ActionFunctionArgs, json, redirect } from 'react-router-dom';
import { getAxios } from './clients';
import { CancelFormData } from '../pages/cancelReservation/CancelReservation';
import { toast } from 'react-toastify';

const cancel = async (data: CancelFormData) =>
  await getAxios().delete('reservation', {
    data,
  });

export const cancelAction =
  (client: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as unknown as CancelFormData;

    try {
      console.log(data);
      await cancel(data);
      await client.invalidateQueries({ queryKey: ['reservation'] });
      toast.success(
        'Avbokning lyckades och vi har skickat en avbokningsbekräftelse till din e-post'
      );
      return redirect('/'); // Redirect to the home page after successful cancel the reservation
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return json({ error: error.response.data.message }, { status: 400 });
      }
      return json({ error: 'Avbokning misslyckades' }, { status: 400 });
    }
  };
