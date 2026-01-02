/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import ApiServicePath from 'enums/ApiServicePath';
import UserResponse from 'interfaces/auth/UserResponse';
import IRoom from 'interfaces/Room';

export const createRoom = async (
  room: IRoom,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.post(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Room}`,
    room,
  );
};

export const getRooms = async (): Promise<AxiosResponse<IRoom[]>> => {
  return axios.get(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Room}`,
  );
};
export const getRoom = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.get(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Room}/${id}`,
  );
};

export const updateRoom = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.patch(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Room}/${id}`,
  );
};

export const deleteRoom = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.delete(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Room}/${id}`,
  );
};
