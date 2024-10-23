import axios, { AxiosRequestConfig } from 'axios';

const apiClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.data;
  }
};

export default apiClient;
