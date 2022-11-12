import { FC } from 'react';
import { useGetToken } from 'services/AuthenticationService';
import Header from 'components/layout/Header';
import PublicHeader from 'components/layout/PublicHeader';

const UserContainer: FC<{ children: any }> = ({ children }) => {
  const isLogin = useGetToken();
  return (
    <div className="">
      {isLogin ? <Header /> : <PublicHeader />}
      {children}
    </div>
  );
};

export default UserContainer;
