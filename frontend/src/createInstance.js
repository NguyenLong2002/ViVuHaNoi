import axios from 'axios';
import jwtDecode from 'jwt-decode';

const refreshToken = async () => {
  try {
    const res = await axios.post('http://localhost:8000/api/auth/refresh', {}, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log('Error refreshing token:', err);
    throw err;
  }
};

export const createAxios = (commit, user, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        try {
          const data = await refreshToken();
          const refreshUser = {
            ...user,
            accessToken: data.accessToken,
          };
          console.log(refreshUser);
          commit(stateSuccess, refreshUser);
          config.headers['authorization'] = 'Bearer ' + data.accessToken;
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
