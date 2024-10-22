import axios, { AxiosRequestConfig } from 'axios';

const apiClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error in API request');
  }
};

export default apiClient;
