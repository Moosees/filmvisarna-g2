import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { getAxios } from '../../api/clients';
import { getRootDataQuery } from '../../api/root';
import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import MemberInfoForm from '../../components/memberinfo/MemberInfoForm';

interface UserData {
  first_name: string;
  last_name: string;
  user_email: string;
}

interface UpdateUserData {
  first_name: string;
  last_name: string;
  current_password: string;
  new_password?: string;
}

interface Booking {
  paramUrl: string;
  movieId: number;
  screeningId: number;
  posterUrl: string;
  age: number;
  title: string;
  startTime: string;
  reservationNum: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayMemberInfo, setDisplayMemberInfo] = useState<UserData | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: { isLoggedIn },
  } = useSuspenseQuery(getRootDataQuery());

  const { reset } = useForm<UpdateUserData>();

  const loadMemberInfo = async () => {
    try {
      const { data } = await getAxios().get<UserData>('/user/member-info');
      setDisplayMemberInfo(data);
      reset(data);
    } catch (error) {
      console.error('Kunde inte ladda medlemsinfo:', error);
    }
  };

  useEffect(() => {
    loadMemberInfo();
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setErrorMessage(null);
    if (!isEditing && displayMemberInfo) reset(displayMemberInfo);
  };

  const onSubmit: SubmitHandler<UpdateUserData> = async (data) => {
    if (data.new_password && data.new_password.length < 8) {
      setErrorMessage('Nytt lösenord måste vara minst 8 tecken långt.');
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(data.first_name)) {
      setErrorMessage('Förnamnet innehåller ogiltiga tecken.');
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(data.last_name)) {
      setErrorMessage('Efternamnet innehåller ogiltiga tecken.');
      return;
    }

    try {
      const response = await getAxios().patch('/user', {
        first_name: data.first_name,
        last_name: data.last_name,
        current_password: data.current_password,
        new_password: data.new_password ? data.new_password : undefined,
      });

      if (response.status === 200) {
        await loadMemberInfo();
        setIsEditing(false);
        setErrorMessage(null);
      } else {
        setErrorMessage('Ett fel uppstod. Försök igen senare.');
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ett oväntat fel uppstod. Försök igen.');
        console.error('Fel vid uppdatering:', error);
      }
    }
  };

  const { data: bookingHistory, error: bookingError } = useQuery<
    Booking[],
    Error
  >({
    queryKey: ['bookingHistory'],
    queryFn: async () => {
      const { data } = await getAxios().get('/user/booking-history');
      return data;
    },
  });

  const { data: currentBookings, error: currentBookingsError } = useQuery<
    Booking[],
    Error
  >({
    queryKey: ['currentBookings'],
    queryFn: async () => {
      const { data } = await getAxios().get('/user/current-bookings');
      return data;
    },
  });

  if (!displayMemberInfo) {
    return <div>Laddar medlemsinformation...</div>;
  }

  if (bookingError || currentBookingsError) {
    return (
      <div>
        Ett fel uppstod vid inläsning av bokningsdata. Vänligen försök igen
        senare.
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <Container fluid className="rounded bg-rosa shadow-sm p-5">
      <Row>
        <Col
          lg={4}
          className="d-flex flex-column align-items-center justify-content-center mb-3 ms-2"
        >
          <h5 className="profile-page-heading d-flex align-items-center">
            <div className="rounded-icon">
              <PersonFill size={28} />
            </div>
            Medlemsinfo
          </h5>
          <MemberInfoForm
            displayMemberInfo={displayMemberInfo}
            isEditing={isEditing}
            onSubmit={onSubmit}
            toggleEdit={toggleEdit}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Col>

        <Col lg={7} className="d-flex flex-column align-items-center">
          <h5 className="profile-page-heading d-flex align-items-center profile-text-bg p-1 rounded">
            Aktuella bokningar
          </h5>
          <div className="cards-wrapper-scroll">
            <CardsWrapper>
              {currentBookings && currentBookings.length > 0 ? (
                currentBookings.map((booking) => {
                  if (!/^[A-Za-z0-9]+$/.test(booking.reservationNum)) {
                    console.error(
                      `Ogiltigt bokningsnummer: ${booking.reservationNum}`
                    );
                    return null;
                  }
                  return (
                    <MovieCard
                      paramUrl={booking.paramUrl}
                      key={booking.reservationNum}
                      movieId={booking.movieId}
                      screeningId={booking.screeningId}
                      posterUrl={booking.posterUrl}
                      age={booking.age}
                      title={booking.title}
                      startTime={booking.startTime.slice(0, -3)}
                      showButton={false}
                      confirmationButton={true}
                      smallFont={true}
                      hideAge={true}
                      reservationNum={booking.reservationNum}
                      allowConfirmationOnly={true}
                      className="profile-movie-card"
                    />
                  );
                })
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
                    paramUrl={booking.paramUrl}
                    key={booking.reservationNum}
                    movieId={booking.movieId}
                    screeningId={booking.screeningId}
                    posterUrl={booking.posterUrl}
                    age={booking.age}
                    title={booking.title}
                    startTime={booking.startTime.slice(0, -3)}
                    showButton={false}
                    confirmationButton={false}
                    smallFont={true}
                    hideAge={true}
                    reservationNum={booking.reservationNum}
                    className="profile-movie-card"
                  />
                ))
              ) : (
                <div>Ingen bokningshistorik</div>
              )}
            </CardsWrapper>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
