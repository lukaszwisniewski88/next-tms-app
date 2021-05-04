import { AiOutlineHome, AiOutlineBank, AiOutlineSetting } from 'react-icons/ai';
import {
  BsListNested,
  BsDownload,
  BsPencilSquare,
  BsArrowLeftShort,
} from 'react-icons/bs';
import { HiOutlineTruck } from 'react-icons/hi';
import { GoReport } from 'react-icons/go';
import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

const MenuItems = [
  {
    name: 'Podsumowanie',
    iconComponent: AiOutlineHome,
    path: '/dashboard',
    children: [],
  },
  {
    name: 'Rejestry',
    iconComponent: BsListNested,
    path: '/registry',
    children: [
      {
        name: 'Klienci',
        iconComponent: BsListNested,
        path: '/registry/clients',
        children: [],
      },
      {
        name: 'Przewoźnicy',
        iconComponent: BsListNested,
        path: '/registry/transporters',
        children: [],
      },
    ],
  },
  {
    name: 'Ładunki',
    iconComponent: BsDownload,
    path: '/loads',
    children: [],
  },
  {
    name: 'Zlecenia',
    iconComponent: BsPencilSquare,
    path: '/orders',
    children: [],
  },
  {
    name: 'Pojazdy',
    iconComponent: HiOutlineTruck,
    path: '/vehicles',
    children: [],
  },
  {
    name: 'Księgowość',
    iconComponent: AiOutlineBank,
    path: '/accounting',
    children: [],
  },
  {
    name: 'Raporty',
    iconComponent: GoReport,
    path: '/reports',
    children: [],
  },
  {
    name: 'Ustawienia',
    iconComponent: AiOutlineSetting,
    path: '/settings',
    children: [],
  },
];

const Menu = () => {
  const { pathname } = useRouter();
  const [listState, setListState] = useState({
    actual: MenuItems,
    previous: undefined,
  });

  useEffect(() => {
    const element = listState.actual.find((item) => item.path === pathname);
    if (element && element.children.length > 0) {
      setListState((state) => ({
        actual: element.children,
        previous: state.actual,
      }));
    }
  }, [pathname]);
  const backMenuHandler = () => {
    setListState((state) => ({
      actual: state.previous,
      previous: undefined,
    }));
  };
  return (
    <>
      {listState.previous && (
        <button
          type='button'
          tw='flex flex-row justify-start items-center gap-4'
          onClick={backMenuHandler}
        >
          <BsArrowLeftShort tw='m-2' /> Cofnij
        </button>
      )}
      <ul>
        {listState.actual.map((item) => (
          <li key={item.path}>
            <Link href={item.path} passHref>
              <a
                href
                tw='flex flex-row justify-start items-center text-xl font-light gap-6 hover:text-purple-500'
              >
                <item.iconComponent />
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Menu;
