import { useEffect } from 'react';
import { useStore as useUser } from '../context/storeContext';

const withPageAuthRequired = (Component, options = {}) =>
  function AuthGuardComponent(props) {
    const loginUrl = process.env.NEXT_PUBLIC_AUTH0_LOGIN || '/api/auth/login';
    const { returnTo } = options;
    const { user, error, isLoading } = useUser();
    useEffect(() => {
      if ((user && !error) || isLoading) return;
      let returnToPath;

      if (!returnTo) {
        const currentLocation = window.location.toString();
        returnToPath =
          currentLocation.replace(new URL(currentLocation).origin, '') || '/';
      } else {
        returnToPath = returnTo;
      }

      window.location.assign(
        `${loginUrl}?returnTo=${encodeURIComponent(returnToPath)}`
      );
    }, [user, error, isLoading]);

    if (isLoading) return <></>;
    if (user) return <Component {...props} />;
    return <></>;
  };

export default withPageAuthRequired;
