import { login } from 'actions/AccountAction';
import LoginForm from 'components/login-form/LoginForm';
import actionTypes from 'context/actionTypes';
import { useAppContext } from 'context/appContext';
import EntityName from 'enums/EntityName';
import LocalStorageKey from 'enums/LocalStorageKey';
import UserPayload from 'interfaces/auth/UserPayload';
import UserResponse from 'interfaces/auth/UserResponse';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import setAxiosConfig from 'services/AxiosConfig';
import { localStorageSetItem } from 'services/LocalStorageService';
import { httpErrorDisplay } from 'services/UtilsService';

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const userContext = useAppContext() as any;

  const navigate = useNavigate();

  const setUserContext = (data: UserResponse): void => {
    const userContextPayload = { token: `Bearer ${data.token}`, user: data };
    setAxiosConfig(userContextPayload.token);
    localStorageSetItem(LocalStorageKey.AUTH, userContextPayload);
    userContext.dispatch({
      type: actionTypes.SIGN_IN,
      payload: userContextPayload,
    });
    navigate('/');
  };

  const handleSubmit = async (user: UserPayload) => {
    try {
      setLoading(true);
      const { data } = await login(user);
      setLoading(false);
      if (data) {
        setUserContext(data);
      }
    } catch (error) {
      setLoading(false);
      httpErrorDisplay(error, EntityName.User);
    }
  };

  return <LoginForm onClickSubmit={handleSubmit} isLoading={loading} />;
};

export default LoginPage;
