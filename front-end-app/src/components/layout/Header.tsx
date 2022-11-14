import { useState, useEffect, FC } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import RoutingPath from 'enums/RoutingPath';
import { localStorageRemoveItem } from 'services/LocalStorageService';
import LocalStorageKey from 'enums/LocalStorageKey';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';

const Header: FC = () => {
  const [openNav, setOpenNav] = useState(false);
  const userContext = useAppContext() as any;
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={RoutingPath.HOME} className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={RoutingPath.COURSE} className="flex items-center">
          Course
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={RoutingPath.TEACHER} className="flex items-center">
          Teacher
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={RoutingPath.ROOM} className="flex items-center">
          Room
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={RoutingPath.BOOKING} className="flex items-center">
          Booking
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={RoutingPath.TEACHER_REPORT} className="flex items-center">
          Teacher Report
        </Link>
      </Typography>
    </ul>
  );
  const onClickLogout = () => {
    localStorageRemoveItem(LocalStorageKey.AUTH);
    userContext.dispatch({ type: actionTypes.SIGN_OUT });
    navigate(RoutingPath.LOGIN);
  };

  return (
    <Navbar className="mx-auto py-2 px-0 lg:px-0 lg:py-4 max-w-[100%]">
      <div className="container  mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span>Nub Class Management</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={onClickLogout}
        >
          <span>Logout</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
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
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Logout</span>
        </Button>
      </MobileNav>
    </Navbar>
  );
};

export default Header;
