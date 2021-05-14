import { getSession } from '@auth0/nextjs-auth0';
import MainLayout from '../../layouts/main';

/**
 *
 * @param {Object} props
 * @returns
 */
function UserProfile({ user }) {
  return (
    <div>
      Imię i nazwisko: {user.name}
      <img alt='Twoje zdjęcie' src={user.picture} />
    </div>
  );
}

export const getServerSideProps = ({ req, res }) => {
  const session = getSession(req, res);
  return {
    props: {
      user: session.user,
    },
  };
};

UserProfile.PageTitle = 'Profil';
export default MainLayout(UserProfile);
