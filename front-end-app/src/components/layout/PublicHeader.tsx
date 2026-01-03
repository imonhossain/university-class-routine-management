import { Button } from 'components/ui/button';
import RoutingPath from 'enums/RoutingPath';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PublicHeader: FC = () => {
  const navigate = useNavigate();

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 font-normal text-gray-700">
        <Link to={RoutingPath.HOME} className="flex items-center">
          Home
        </Link>
      </li>
      <li className="p-1 font-normal text-gray-700">
        <Link to={RoutingPath.BOOKING} className="flex items-center">
          Routine
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
    navigate(RoutingPath.LOGIN);
  };

  return (
    <nav className="mx-auto py-2 px-4 lg:px-8 lg:py-4 w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between text-gray-900">
        <div className="hidden lg:block">{navList}</div>
        <Button
          size="sm"
          className="hidden lg:inline-flex"
          onClick={onClickLogout}
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default PublicHeader;
