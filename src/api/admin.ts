import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAxios } from './clients';
import { MovieData } from './details';

type PostMovieData = Omit<MovieData, 'genres' | 'screeningDetails'>;

async function postMovie(reservationData: PostMovieData) {
  const response = await getAxios().post('movie', reservationData);

  return response;
}

export const adminMovieAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as Omit<
    PostMovieData,
    'movieId'
  >;

  const movieId = params.id ? +params.id : 0;

  try {
    await postMovie({
      ...data,
      movieId,
    });

    toast.success('Filmdatabasen uppdaterad');
    return null;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.data?.message || error.response?.data?.error)
    ) {
      toast.warn(error.response.data.message || error.response.data.error);
      return null;
    }
    toast.warn('Filmdatabasen kunde inte uppdateras');
    return null;
  }
};
