import { css } from 'twin.macro';
import Link from 'next/link';
import MainLayout from '../layouts/main';
import { useStore } from '../context/storeContext';
import useAuthGuard from '../hooks/useAuthGuard';

const DashboardPage = () => {
  useAuthGuard();
  const user = useStore((state) => state.user);
  if (!user) return null;
  return (
    <MainLayout title='Strona Główna'>
      <div tw='flex flex-row flex-wrap max-w-full overflow-scroll'>
        <h1>Dashboard</h1>
        <Link href='/registry'>Registry</Link>
        <div
          css={css`
            width: 60px;
            height: 60px;
            border-radius: 2rem;
            background-size: cover;
            background-image: url(${user ? user.picture : ''});
            background-repeat: no-repeat;
            border-width: 4px;
            border-color: var(--primary-color);
          `}
        />
        <Link href='/api/auth/logout'>Logout</Link>
      </div>
    </MainLayout>
  );
};

DashboardPage.PageTitle = 'Dashboard';
export default DashboardPage;
