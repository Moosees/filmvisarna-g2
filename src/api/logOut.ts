import { useMutation } from '@tanstack/react-query';
import { getAxios, getQueryClient } from './clients';

const logOut = async () => await getAxios().delete('user');

export const useLogOutMutation = () =>
  useMutation({
    mutationFn: logOut,
    onSettled: async () => {
      await getQueryClient().invalidateQueries({ queryKey: ['user'] });
    },
  });
