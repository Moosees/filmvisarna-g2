import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { getAxios } from '../../api/clients';
import { useQuery } from '@tanstack/react-query';
import MovieCard from '../../components/movieCard/MovieCard';
import CardsWrapper from '../../components/movieCard/CardsWrapper';

interface Booking {
  movieId: number;
  screeningId: number;
  src: string;
  age: number;
  title: string;
  startTime: string;
  reservationNum: string;
}

interface UserData {
  first_name: string;
  last_name: string;
  user_email: string;
}

const ProfilePage: React.FC = () => {
  const fetchMemberInfo = async (): Promise<UserData> => {
    const { data } = await getAxios().get('/user/member-info');
    return data;
  };

  const { data: memberInfo } = useQuery<UserData, Error>({
    queryKey: ['memberInfo'],
    queryFn: fetchMemberInfo,
  });

  if (!memberInfo) {
    return <div>Ingen medlemsinformation tillgänglig.</div>;
  }

  const fetchBookingHistory = async (): Promise<Booking[]> => {
    const { data } = await getAxios().get('/user/booking-history');
    return data;
  };

  const { data: bookingHistory } = useQuery<Booking[], Error>({
    queryKey: ['bookingHistory'],
    queryFn: fetchBookingHistory,
  });

  const fetchCurrentBookings = async (): Promise<Booking[]> => {
    const { data } = await getAxios().get('/user/current-bookings');
    return data;
  };

  const { data: currentBookings } = useQuery<Booking[], Error>({
    queryKey: ['currentBookings'],
    queryFn: fetchCurrentBookings,
  });

  return (
    <>
      <Container className="rounded bg-rosa shadow-sm p-5">
        <Row>
          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <h5 className="profile-page-heading d-flex align-items-center">
              <PersonFill size={28} />
              Medlemsinfo
            </h5>
            <div className="w-100 text-start">
              <h6 className="profile-text-bg p-1 rounded">
                Förnamn: {memberInfo?.first_name}
              </h6>
              <h6 className="profile-text-bg p-1 rounded">
                Efternamn: {memberInfo?.last_name}
              </h6>

              <h6 className="profile-text-bg p-1 rounded">
                E-post: {memberInfo?.user_email}
              </h6>
            </div>
            <PrimaryBtn title="Ändra" />
          </Col>

          <Col md={6}>
            <h5 className="profile-page-heading d-flex align-items-center profile-text-bg p-1 rounded">
              Aktuella bokningar
            </h5>
            <CardsWrapper>
              {currentBookings && currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <MovieCard
                    key={booking.screeningId}
                    movieId={booking.movieId}
                    screeningId={booking.screeningId}
                    src={booking.src}
                    age={booking.age}
                    title={booking.title}
                    startTime={booking.startTime}
                    showButton={false}
                    reservationNum={booking.reservationNum}
                  />
                ))
              ) : (
                <div>Inga aktuella bokningar</div>
              )}
            </CardsWrapper>
            <h5 className="profile-page-heading d-flex align-items-center profile-text-bg p-1 rounded">
              Bokningshistorik
            </h5>
            <CardsWrapper>
              {bookingHistory && bookingHistory.length > 0 ? (
                bookingHistory.map((booking) => (
                  <MovieCard
                    key={booking.screeningId}
                    movieId={booking.movieId}
                    screeningId={booking.screeningId}
                    src={booking.src}
                    age={booking.age}
                    title={booking.title}
                    startTime={booking.startTime}
                  />
                ))
              ) : (
                <div>Inga tidigare bokningar</div>
              )}
            </CardsWrapper>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
