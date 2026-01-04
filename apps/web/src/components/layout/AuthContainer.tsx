import { FC } from 'react';

const AuthContainer: FC<{ children: any }> = ({ children }) => {
  return (
    <div className="auth-container bg-auth-background bg-cover h-screen">
      <div className="auth-header  mb-4">
        <div className="w-32.5 text-center">Nub</div>
      </div>
      {children}
    </div>
  );
};

export default AuthContainer;
