import { useState, useEffect, FC } from 'react';
import { Button } from 'components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import RoutingPath from 'enums/RoutingPath';
import { localStorageRemoveItem } from 'services/LocalStorageService';
import LocalStorageKey from 'enums/LocalStorageKey';
import { useUserStore } from 'stores';

const Header: FC = () => {
  const [openNav, setOpenNav] = useState(false);
  const signOut = useUserStore((state) => state.signOut);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 font-normal text-gray-700">
        <Link to={RoutingPath.HOME} className="flex items-center">
          Home
        </Link>
      </li>
      <li className="p-1 font-normal text-gray-700">
        <Link to={RoutingPath.COURSE} className="flex items-center">
          Course
        </Link>
      </li>
      <li className="p-1 font-normal text-gray-700">
        <Link to={RoutingPath.TEACHER} className="flex items-center">
          Teacher
        </Link>
      </li>
      <li className="p-1 font-normal text-gray-700">
        <Link to={RoutingPath.ROOM} className="flex items-center">
          Room
        </Link>
      </li>
      <li className="p-1 font-normal text-gray-700">
        <Link to={RoutingPath.BOOKING} className="flex items-center">
          Booking
        </Link>
      </li>
      <li className="p-1 font-normal text-gray-700">
        <Link to={RoutingPath.TEACHER_REPORT} className="flex items-center">
          Teacher Report
        </Link>
      </li>
    </ul>
  );
  const onClickLogout = () => {
    localStorageRemoveItem(LocalStorageKey.AUTH);
    signOut();
    navigate(RoutingPath.LOGIN);
  };

  return (
    <nav className="mx-auto py-2 px-4 lg:px-8 lg:py-4 w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between text-gray-900">
        <a href="#" className="mr-4 cursor-pointer py-1.5 font-normal text-sm">
          <span>Nub Class Management</span>
        </a>
        <div className="hidden lg:block">{navList}</div>
        <Button
          size="sm"
          className="hidden lg:inline-flex"
          onClick={onClickLogout}
        >
          Logout
        </Button>
        <button
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {openNav && (
        <div className="lg:hidden">
          {navList}
          <Button size="sm" className="w-full mb-2" onClick={onClickLogout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
