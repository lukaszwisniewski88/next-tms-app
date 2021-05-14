import { BsFillBellFill as BellIcon } from 'react-icons/bs';
import { HiChevronDown as ChevronD } from 'react-icons/hi';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import tw, { css } from 'twin.macro';
import { useStore } from '../../context/storeContext';

const activeMenuItem = css`
  ${tw`border-purple-500`}
`;
const menuItem = css`
  ${tw`border-b-2 p-1 text-sm `}
`;

function UserBox() {
  const user = useStore((state) => state.user);
  return (
    <>
      <BellIcon tw='w-5 h-5' />
      <span tw='w-1 h-full border-r-2 border-purple-600' />
      <Menu tw='relative' as='div'>
        <Menu.Button>
          <div tw='flex flex-row gap-2 items-center'>
            <img tw='w-8 h-8 rounded-full' alt='profile' src={user.picture} />
            <span tw='text-sm font-light'>{user.nickname}</span>
            <ChevronD tw='self-end -mx-1.5' />
          </div>
        </Menu.Button>
        <Menu.Items tw='absolute left-0 top-8 bg-white border-purple-500 border-2 w-full px-3 py-2'>
          <ul>
            <Menu.Item>
              {({ active }) => (
                <li css={[menuItem, active && activeMenuItem]}>
                  <Link href='/profile' passHref>
                    Profile
                  </Link>
                </li>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <li css={[menuItem, active && activeMenuItem]}>Settings</li>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <li css={[menuItem, active && activeMenuItem]}> log out</li>
              )}
            </Menu.Item>
          </ul>
        </Menu.Items>
      </Menu>
    </>
  );
}

export default UserBox;
