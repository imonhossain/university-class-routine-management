import { Button, Navbar, Typography } from '@material-tailwind/react';
import RoutingPath from 'enums/RoutingPath';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PublicHeader: FC = () => {
  const navigate = useNavigate();

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
    </ul>
  );
  const onClickLogout = () => {
    navigate(RoutingPath.LOGIN);
  };

  return (
    <Navbar className="mx-auto py-2 px-0 lg:px-0 lg:py-4 max-w-[100%]">
      <div className="container  mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="hidden lg:block">{navList}</div>
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={onClickLogout}
        >
          <span>Login</span>
        </Button>
      </div>
    </Navbar>
  );
};

export default PublicHeader;
