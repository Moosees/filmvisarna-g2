import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { getAxios } from '../../api/clients';
import { useQuery } from '@tanstack/react-query';

interface Booking {
  id: number;
  movie_title: string;
  date: string;
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

  const {
    data: memberInfo,
    isLoading,
    error,
  } = useQuery<UserData, Error>({
    queryKey: ['memberInfo'],
    queryFn: fetchMemberInfo,
  });

  if (isLoading) {
    return <div>Laddar...</div>;
  }

  if (error) {
    return <div>Ett fel inträffade vid hämtning av medlemsinformation.</div>;
  }

  if (!memberInfo) {
    return <div>Ingen medlemsinformation tillgänglig.</div>;
  }

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
              <h6 className="profile-text-bg p-1 rounded">Medlemsnr:</h6>
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
            <ListGroup
              style={{
                maxHeight: '150px',
                overflowY: 'scroll',
                minHeight: '150px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#ffe4e1 #ffbfed',
              }}
              className="mb-3"
            ></ListGroup>
            <h5 className="profile-page-heading d-flex align-items-center profile-text-bg p-1 rounded">
              Bokningshistorik
            </h5>
            <ListGroup
              style={{
                maxHeight: '150px',
                overflowY: 'scroll',
                minHeight: '150px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#ffe4e1 #ffbfed',
              }}
            ></ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
