import { PersonFill } from 'react-bootstrap-icons';

const ProfilePage: React.FC = () => {
  return (
    <>
      <section className="row justify-content-center">
        <article className="col-md-6 col-lg-5 card rounded bg-rosa shadow-sm">
          <article className="card-body">
            <h5 className="profile-page-heading">
              <PersonFill size={28} />
              Medlemsinfo
            </h5>
          </article>
        </article>
      </section>
    </>
  );
};

export default ProfilePage;
