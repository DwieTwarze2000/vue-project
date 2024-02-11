import { getToken } from '@/utils/auth.utils';

export const apiUrl = 'http://localhost:30000/';

export const defaultPost = async (
  endpoint: string,
  data: any,
  auth = false
): Promise<any> => {
  const token: string | null = getToken();
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

export const defaultGet = async (
  endpoint: string,
  auth = false
): Promise<any> => {
  const token: string | null = getToken();
  const response = await fetch(apiUrl + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token && { Authorization: `Bearer ${token}` }),
    },
  });

  return response.json();
};

export const defaultDelete = async (
  endpoint: string,
  auth = false
): Promise<any> => {
  const token: string | null = getToken();
  const response = await fetch(apiUrl + endpoint, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token && { Authorization: `Bearer ${token}` }),
    },
  });

  return response.json();
};

export const defaultPatch = async (
  endpoint: string,
  data: any,
  auth = false
): Promise<any> => {
  const token: string | null = getToken();
  const response = await fetch(apiUrl + endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
