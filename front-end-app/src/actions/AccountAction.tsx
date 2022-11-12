/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import ApiServicePath from 'enums/ApiServicePath';
import UserPayload from 'interfaces/auth/UserPayload';
import UserResponse from 'interfaces/auth/UserResponse';

export const login = async (
  user: UserPayload,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.post(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.SignIn}`,
    user,
  );
};
