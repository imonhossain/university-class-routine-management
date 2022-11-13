/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import ApiServicePath from 'enums/ApiServicePath';
import UserResponse from 'interfaces/auth/UserResponse';
import ITeacher from 'interfaces/Teacher';

export const createTeacher = async (
  teacher: ITeacher,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.post(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Teacher}`,
    teacher,
  );
};

export const getTeachers = async (): Promise<AxiosResponse<ITeacher[]>> => {
  return axios.get(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Teacher}`,
  );
};
export const getTeacher = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.get(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Teacher}/${id}`,
  );
};

export const updateTeacher = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.patch(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Teacher}/${id}`,
  );
};

export const deleteTeacher = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.delete(
    `${process.env.REACT_APP_SERVICE_API}/${ApiServicePath.Teacher}/${id}`,
  );
};
