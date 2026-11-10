import axios from 'axios';
import { NGROK_LINK } from './const';

const axiosInstance = axios.create({
    baseURL: NGROK_LINK,
    headers: {
        "ngrok-skip-brower-warning": "true",
    },
});

axiosInstance.interceptors.response.use(
    // Success handler - pass through
    (response) => response,
  
    async (error) => {
      const { config, response } = error;
      const maxRetries = 3;
      const retryDelay = 1000; // 1 second
  
      if (!config.__retryCount) {
        config.__retryCount = 0;
      }
  
      if (config.__retryCount < maxRetries && response?.status === 500) {
        config.__retryCount += 1;
  
        await new Promise(resolve => setTimeout(resolve, retryDelay));
  
        return axiosInstance(config);
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;