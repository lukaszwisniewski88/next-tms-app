import { useEffect } from 'react'
import { useStore } from '../context/storeContext'


export default function useAuthGuard(options = {}) {
    const { returnTo } = options
    const loginUrl = process.env.NEXT_PUBLIC_AUTH0_LOGIN || '/api/auth/login'
    const  user  = useStore(state => state.user)
    const isLoading = useStore(state=> state.isLoading)
    useEffect(() => {
      if (user || isLoading) return;
      let returnToPath

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
    }, [user,  isLoading]);
}