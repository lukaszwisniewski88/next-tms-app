import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import { css } from 'twin.macro';
import useSWR from 'swr';
import Link from 'next/link';
import MainLayout from '../layouts/main';

const DashboardPage = withPageAuthRequired(() => {
  const { data, isLoading: loadingMeta } = useSWR('/api/auth/meta');
  const { isLoading, user } = useUser();
  return (
    <MainLayout title='Strona Główna'>
      <div tw='flex flex-row flex-wrap max-w-full overflow-scroll'>
        <h1>Dashboard</h1>

        {isLoading || (loadingMeta && <h2> Loading </h2>)}
        {data && (
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            ipsam odit dignissimos nulla quibusdam nihil! Cupiditate maxime
            aspernatur et nesciunt?{' '}
          </p>
        )}
        <div
          css={css`
            width: 60px;
            height: 60px;
            border-radius: 2rem;
            background-size: cover;
            background-image: url(${user.picture});
            background-repeat: no-repeat;
            border-width: 4px;
            border-color: var(--primary-color);
          `}
        />
        <Link href='/api/auth/logout'>Logout</Link>
      </div>
    </MainLayout>
  );
});

DashboardPage.PageTitle = 'Dashboard';
export default DashboardPage;
