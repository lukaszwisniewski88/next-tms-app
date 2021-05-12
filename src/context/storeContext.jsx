import createContext from 'zustand/context';
import { useEffect } from 'react';
import store from '../store/user';

const { Provider, useStore } = createContext();

function UserProvider({ children }) {
  const user = store((state) => state.user);
  const checkSession = store((state) => state.checkSession);
  useEffect(() => {
    if (user !== undefined) return;
    (async () => {
      await checkSession();
    })();
  }, [user]);

  return <Provider initialStore={store}>{children}</Provider>;
}

export { UserProvider, useStore };
