/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosError } from 'axios';
import EntityName from 'enums/EntityName';
import { toastError } from 'services/ToasterServices';

export const errorMessage = (statusCode: number, type?: EntityName): string => {
  const entityName = type || '';
  switch (statusCode) {
    case 500:
      return 'something went wrong please try again';
    case 405:
      return `Sorry! ${entityName} couldn't find it.`;
    case 404:
      return `Sorry! ${entityName} couldn't find it.`;
    case 400:
      return `Invalid ${entityName} input data`;
    default:
      return `${entityName} has some problem`;
  }
};

export const httpErrorDisplay = (error: any, type?: EntityName): void => {
  // NOTE: this log for understanding error
  /* eslint-disable-next-line no-console */
  console.error('error', error);
  if (error?.response?.data?.message) {
    toastError(error.response.data.message);
  } else {
    const err = error as AxiosError;
    const statusCode: number = err.response?.status as number;
    toastError(errorMessage(statusCode, type));
  }
};
