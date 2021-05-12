import 'twin.macro';
import { BsFillBellFill as BellIcon } from 'react-icons/bs';
import { HiChevronDown as ChevronD } from 'react-icons/hi';
import { useStore } from '../../context/storeContext';

function UserBox() {
  const { user, isLoading } = useStore((state) => ({
    user: state.user,
    isLoading: state.isLoading,
  }));
  return !isLoading ? (
    <>
      <BellIcon tw='w-5 h-5' />
      <span tw='w-1 h-full border-r-2 border-purple-600' />
      <div tw='flex flex-row gap-2 items-center'>
        <img tw='w-8 h-8 rounded-full' alt='profile' src={user.picture} />
        <span tw='text-sm font-light'>{user.nickname}</span>
        <ChevronD tw='self-end -mx-1.5' />
      </div>
    </>
  ) : null;
}

export default UserBox;
