/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import ApiServicePath from 'enums/ApiServicePath';
import UserResponse from 'interfaces/auth/UserResponse';
import IBooking from 'interfaces/Booking';

export const createBooking = async (
  booking: IBooking,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.post(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Booking}`,
    booking,
  );
};

export const getBookings = async (): Promise<AxiosResponse<IBooking[]>> => {
  return axios.get(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Booking}`,
  );
};
export const getBooking = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.get(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Booking}/${id}`,
  );
};

export const updateBooking = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.patch(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Booking}/${id}`,
  );
};

export const deleteBooking = async (
  id: string,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.delete(
    `${import.meta.env.VITE_SERVICE_API}/${ApiServicePath.Booking}/${id}`,
  );
};
