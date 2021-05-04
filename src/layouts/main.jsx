import 'twin.macro';

import UserBox from '../components/user/UserBox';

function MainLayout({ children: page, title }) {
  return (
    <div tw='h-screen flex flex-row overflow-hidden'>
      <div tw='p-4 bg-gray-100 border-r-2 border-purple-400'> SIDE </div>
      <div tw='flex-1 flex flex-col gap-2'>
        <div tw='px-3.5 py-2 h-14 bg-purple-50  flex flex-row w-full gap-4 items-center'>
          <span tw='text-lg font-semibold flex-1'>
            {title || 'No Name Page'}
          </span>
          <input
            tw='rounded-lg w-52 p-2 text-xs focus:ring-2 border-0 ring-purple-400 outline-none'
            type='text'
            placeholder='Search Bar'
          />
          <UserBox />
        </div>
        <div tw=' p-2 border-purple-400 border-t-2 border-b-2 -my-2'>
          {' '}
          tools{' '}
        </div>
        <div tw='flex-1 overflow-auto m-1 p-2 max-w-full'> {page} </div>
      </div>
    </div>
  );
}

export default MainLayout;
