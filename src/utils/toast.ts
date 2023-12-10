import { toast, ToastOptions } from 'react-toastify';

const config: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: 'colored',
  pauseOnFocusLoss: false,
  className: 'text-break',
};

const success = (message: string) => {
  toast.success(message, config);
};

const error = (message: string) => {
  toast.error(message, config);
};

const warn = (message: string) => {
  toast.warn(message, config);
};

const info = (message: string) => {
  toast.info(message, config);
};

export default {
  success,
  error,
  warn,
  info,
};