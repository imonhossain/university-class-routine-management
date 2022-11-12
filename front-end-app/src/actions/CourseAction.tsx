/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import ApiServicePath from 'enums/ApiServicePath';
import UserPayload from 'interfaces/auth/UserPayload';
import UserResponse from 'interfaces/auth/UserResponse';
import ICourse from 'interfaces/Course';

export const createCourse = async (
  user: UserPayload,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.post(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Course}`,
    user,
  );
};

export const getCourses = async (): Promise<AxiosResponse<ICourse[]>> => {
  return axios.get(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Course}`,
  );
};
export const getCourse = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.get(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Course}/${id}`,
  );
};

export const updateCourse = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.patch(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Course}/${id}`,
  );
};

export const deleteCourse = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.delete(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Course}/${id}`,
  );
};
