import { getToken } from '@/utils/auth.utils';

export const apiUrl = 'http://localhost:3000/';
const token = getToken();

export const defaultPost = async (
  endpoint: string,
  data: any,
  auth = false
): Promise<any> => {
  const response = await fetch(apiUrl + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
