import axios from 'axios';

const setAxiosConfig = (token: string) => {
  /* eslint-disable dot-notation */
  axios.defaults.headers.common['Authorization'] = token;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
};
export default setAxiosConfig;
