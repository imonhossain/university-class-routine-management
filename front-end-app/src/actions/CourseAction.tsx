/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import ApiServicePath from 'enums/ApiServicePath';
import UserResponse from 'interfaces/auth/UserResponse';
import ICourse from 'interfaces/Course';

export const createCourse = async (
  course: ICourse,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.post(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Course}`,
    course,
  );
};

export const getCourses = async (): Promise<AxiosResponse<ICourse[]>> => {
  return axios.get(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Course}`,
  );
};
export const getCourse = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.get(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Course}/${id}`,
  );
};

export const updateCourse = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.patch(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Course}/${id}`,
  );
};

export const deleteCourse = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.delete(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Course}/${id}`,
  );
};
