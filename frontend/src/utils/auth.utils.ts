export const saveToken = (token: string): void => {
  localStorage.setItem('auth', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('auth');
};

export const removeToken = (): void => {
  localStorage.removeItem('auth');
};
