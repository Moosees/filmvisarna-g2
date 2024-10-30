import { Container, Row, Col } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { getAxios } from '../../api/clients';
import { useQuery } from '@tanstack/react-query';
import MovieCard from '../../components/movieCard/MovieCard';
import CardsWrapper from '../../components/movieCard/CardsWrapper';

interface Booking {
  movieId: number;
  screeningId: number;
  posterUrl: string;
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

const fetchMemberInfo = async (): Promise<UserData> => {
  const { data } = await getAxios().get('/user/member-info');
  return data;
};

const fetchCurrentBookings = async (): Promise<Booking[]> => {
  const { data } = await getAxios().get('/user/current-bookings');
  return data;
};

const fetchBookingHistory = async (): Promise<Booking[]> => {
  const { data } = await getAxios().get('/user/booking-history');
  return data;
};

const ProfilePage: React.FC = () => {
  const { data: memberInfo, error: memberError } = useQuery<UserData, Error>({
    queryKey: ['memberInfo'],
    queryFn: fetchMemberInfo,
  });

  const { data: bookingHistory, error: bookingError } = useQuery<
    Booking[],
    Error
  >({
    queryKey: ['bookingHistory'],
    queryFn: fetchBookingHistory,
  });

  const { data: currentBookings, error: currentBookingsError } = useQuery<
    Booking[],
    Error
  >({
    queryKey: ['currentBookings'],
    queryFn: fetchCurrentBookings,
  });

  if (memberError || bookingError || currentBookingsError) {
    return <div>Ett fel uppstod vid inläsning av data.</div>;
  }

  if (!memberInfo) {
    return <div>Ingen medlemsinformation tillgänglig.</div>;
  }

  return (
    <>
      <Container fluid className="rounded bg-rosa shadow-sm p-5">
        <Row>
          <Col
            md={4}
            className="d-flex flex-column align-items-center justify-content-center mb-3 ms-2"
          >
            <h5 className="profile-page-heading d-flex align-items-center">
              <div className="rounded-icon">
                <PersonFill size={28} />
              </div>
              Medlemsinfo
            </h5>
            <div className="w-100 text-start">
              <h6 className="profile-text-bg p-1 rounded mt-3">
                Förnamn: {memberInfo?.first_name}
              </h6>
              <h6 className="profile-text-bg p-1 rounded mt-3">
                Efternamn: {memberInfo?.last_name}
              </h6>

              <h6 className="profile-text-bg p-1 rounded mt-3">
                E-post: {memberInfo?.user_email}
              </h6>
            </div>
            <PrimaryBtn className="mt-3">Ändra</PrimaryBtn>
          </Col>

          <Col md={7} className="d-flex flex-column align-items-center">
            <h5 className="profile-page-heading d-flex align-items-center profile-text-bg p-1 rounded">
              Aktuella bokningar
            </h5>
            <div className="cards-wrapper-scroll">
              <CardsWrapper>
                {currentBookings && currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
                    <MovieCard
                      key={booking.screeningId}
                      movieId={booking.movieId}
                      screeningId={booking.screeningId}
                      posterUrl={booking.posterUrl}
                      age={booking.age}
                      title={booking.title}
                      startTime={booking.startTime}
                      showButton={false}
                      confirmationButton={true}
                      smallFont={true}
                      hideAge={true}
                      className="profile-movie-card"
                    />
                  ))
                ) : (
                  <div>Inga aktuella bokningar</div>
                )}
              </CardsWrapper>
            </div>
            <h5 className="profile-page-heading d-flex align-items-center profile-text-bg p-1 rounded mt-3">
              Bokningshistorik
            </h5>
            <div className="cards-wrapper-scroll">
              <CardsWrapper>
                {bookingHistory && bookingHistory.length > 0 ? (
                  bookingHistory.map((booking) => (
                    <MovieCard
                      key={booking.screeningId}
                      movieId={booking.movieId}
                      screeningId={booking.screeningId}
                      posterUrl={booking.posterUrl}
                      age={booking.age}
                      title={booking.title}
                      startTime={booking.startTime}
                      showButton={false}
                      confirmationButton={false}
                      hideAge={true}
                      className="profile-movie-card"
                    />
                  ))
                ) : (
                  <div>Inga tidigare bokningar</div>
                )}
              </CardsWrapper>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
