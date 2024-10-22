import { useState, useEffect } from 'react';

const useApi = <T>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 在請求之前設置載入狀態
      try {
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiCall]); // 確保這裡的依賴項正確

  return { data, loading, error };
};

export default useApi;
