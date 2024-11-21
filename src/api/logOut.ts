import { useMutation } from '@tanstack/react-query';
import { getAxios, getQueryClient } from './clients';
import { toast } from 'react-toastify'; // Import toast

const logOut = async () => await getAxios().delete('user');

export const useLogOutMutation = () =>
  useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success('Du är nu utloggad'); // Show success toast on logout
    },
    onSettled: async () => {
      await getQueryClient().invalidateQueries({ queryKey: ['user'] });
    },
  });
