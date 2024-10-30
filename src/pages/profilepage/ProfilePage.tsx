import { Container, Row, Col } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { getAxios } from '../../api/clients';
import { useQuery } from '@tanstack/react-query';
import MovieCard from '../../components/movieCard/MovieCard';
import CardsWrapper from '../../components/movieCard/CardsWrapper';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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

interface UpdateUserData {
  first_name: string;
  last_name: string;
  current_password: string;
  new_password?: string;
  confirm_new_password?: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayMemberInfo, setDisplayMemberInfo] = useState<UserData | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateUserData>();

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
    if (!isEditing && displayMemberInfo) reset(displayMemberInfo);
  };

  const newPassword = watch('new_password');

  const onSubmit: SubmitHandler<UpdateUserData> = async (data) => {
    try {
      await getAxios().patch('/user', {
        first_name: data.first_name,
        last_name: data.last_name,
        current_password: data.current_password,
        new_password: data.new_password,
      });

      await loadMemberInfo();
      setIsEditing(false);
      console.log('Data sparat och medlemsinfo uppdaterad');
    } catch (error) {
      console.error('Fel vid uppdatering:', error);
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
    return <div>Ett fel uppstod vid inläsning av bokningsdata.</div>;
  }

  return (
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-100 text-start">
            {isEditing ? (
              <>
                <p className="instructions-text p-1 rounded mt-3">
                  Uppdatera den informationen du vill
                </p>
                <input
                  type="text"
                  {...register('first_name')}
                  placeholder="Förnamn"
                  className="form-control mt-3 editable-input"
                  defaultValue={displayMemberInfo.first_name || ''}
                />
                <input
                  type="text"
                  {...register('last_name')}
                  placeholder="Efternamn"
                  className="form-control mt-3 editable-input"
                  defaultValue={displayMemberInfo.last_name || ''}
                />
                <input
                  type="password"
                  {...register('new_password')}
                  placeholder="Nytt lösenord"
                  className="form-control mt-3 editable-input"
                />
                <input
                  type="password"
                  {...register('confirm_new_password', {
                    validate: (value) =>
                      value === newPassword || 'Lösenorden matchar inte',
                  })}
                  placeholder="Bekräfta nytt lösenord"
                  className="form-control mt-3 editable-input"
                />
                {errors.confirm_new_password && (
                  <small className="text-danger">
                    {errors.confirm_new_password.message}
                  </small>
                )}
                <p className="instructions-text p-1 rounded mt-3">
                  Ange ditt nuvarande lösenord för att spara ändringar
                </p>
                <input
                  type="password"
                  {...register('current_password', {
                    required:
                      'Ange ditt nuvarande lösenord för att spara ändringar',
                  })}
                  placeholder="Nuvarande lösenord"
                  className="form-control mt-3 editable-input"
                />
                {errors.current_password && (
                  <small className="text-danger">
                    {errors.current_password.message}
                  </small>
                )}
                <div className="d-flex flex-column align-items-center mt-3">
                  <PrimaryBtn title="Spara" type="submit" />
                  <PrimaryBtn
                    title="Avbryt"
                    type="button"
                    onClick={toggleEdit}
                  />
                </div>
              </>
            ) : (
              <>
                <h6 className="profile-text-bg p-1 rounded mt-3">
                  Förnamn: {displayMemberInfo.first_name}
                </h6>
                <h6 className="profile-text-bg p-1 rounded mt-3">
                  Efternamn: {displayMemberInfo.last_name}
                </h6>
                <h6 className="profile-text-bg p-1 rounded mt-3">
                  E-post: {displayMemberInfo.user_email}
                </h6>
                <div className="d-flex flex-column align-items-center mt-3">
                  <PrimaryBtn
                    title="Ändra"
                    onClick={toggleEdit}
                    type="button"
                  />
                </div>
              </>
            )}
          </form>
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
                    startTime={booking.startTime.slice(0, -3)}
                    showButton={false}
                    confirmationButton={true}
                    smallFont={true}
                    hideAge={true}
                    reservationNum={booking.reservationNum}
                    allowConfirmationOnly={true}
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
                    startTime={booking.startTime.slice(0, -3)}
                    showButton={false}
                    confirmationButton={false}
                    smallFont={true}
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
  );
};

export default ProfilePage;
