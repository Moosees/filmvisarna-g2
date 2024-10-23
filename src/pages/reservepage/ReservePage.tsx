import { useLoaderData } from 'react-router-dom';
import Hall from '../../components/hall/Hall';

function ReservePage() {
  const data = useLoaderData();
  console.log(data);

  return <Hall seatRows={[1, 2, 3]} />;
}

export default ReservePage;
