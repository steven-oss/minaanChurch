import { GenderType } from '../pages/memberManagement/MemberManagementScreen.tsx';
import apiClient from './apiClient.ts';

export const fetchGenderData = async ():Promise<GenderType> => {
  return apiClient<GenderType>({
    url: 'http://localhost:8000/gender', // 替換為你的 API 路徑
    method: 'GET',
  });
};
