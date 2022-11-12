import { toast } from 'react-toastify';

export const toastSuccess = (message: any = '') => {
  return toast.success(
    typeof message === 'string' ? message : JSON.stringify(message),
    {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    },
  );
};

export const toastError = (message: any = '') => {
  return toast.error(
    typeof message === 'string' ? message : JSON.stringify(message),
    {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    },
  );
};
export const toastWarning = (message: any = '') => {
  return toast.warning(
    typeof message === 'string' ? message : JSON.stringify(message),
    {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    },
  );
};
