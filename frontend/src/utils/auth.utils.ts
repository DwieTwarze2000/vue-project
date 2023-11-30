import { defaultGet } from '@/services/api.service';
export const saveToken = (token: string): void => {
  localStorage.setItem('auth', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('auth');
};

export const removeToken = (): void => {
  localStorage.removeItem('auth');
};

export const getUser = async (): Promise<any> => {
  try {
    const userData = await defaultGet('auth/user', true);
    if (userData) {
      return userData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
