import MainLayout from '../layouts/main';
import { useStore } from '../context/storeContext';
import useAuthGuard from '../hooks/useAuthGuard';

const Registry = () => {
  useAuthGuard();
  const store = useStore();
  if (!store.user) return null;
  return (
    <MainLayout title='Rejestry'>
      <div>Register</div>
    </MainLayout>
  );
};
Registry.PageTitle = 'Dashboard';
export default Registry;
