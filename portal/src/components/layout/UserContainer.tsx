import { FC } from 'react';
import { getToken } from 'services/AuthenticationService';
import Header from 'components/layout/Header';
import PublicHeader from 'components/layout/PublicHeader';

const UserContainer: FC<{ children: any }> = ({ children }) => {
  const isLogin = getToken();
  return (
    <div className={`pb-8 ${isLogin ? 'user-container pt-20 md:pt-24 bg-cover min-h-screen bg-mute' : 'auth-container bg-auth-background bg-cover min-h-screen'}`}>
      {isLogin ? <Header /> : <PublicHeader />}
      {children}
    </div>
  );
};

export default UserContainer;
