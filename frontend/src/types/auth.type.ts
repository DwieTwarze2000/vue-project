export enum RegisterError {
  LOGIN_ALREADY_EXISTS = 'duplicate key error',
  LOGIN_REQUIRED = 'Login is required',
  PASSWORD_REQUIRED = 'Password is required',
  PHONE_REQUIRED = 'Phone number is required',
}

export interface RegisterData {
  login: string;
  password: string;
  mainPhoneNumber: string;
}

export interface RegisterResponse {
  error?: string;
  _id: string;
  login: string;
  password: string;
  mainPhoneNumber: string;
  createdAt: string;
  phoneNumbers?: UserPhones[];
}

export interface RegisterResponseFail {
  error: string;
}

export interface UserPhones {
  phoneNumber: string;
  name: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface LoginResponse {
  error?: string;
  token: string;
}

export const logoutSuccess = 'Logout success';

export interface LogoutResponse {
  message?: string;
  error?: string;
}

export interface User {
  _id: string;
  login: string;
  password: string;
  mainPhoneNumber: string;
  createdAt: string;
  phoneNumbers: UserPhones[];
}

export interface UserData {
  mainPhoneNumber: string;
  oldPassword: string;
  newPassword: string;
  phoneNumbers: UserPhones[];
}
export interface DeleteUserResponse {
  message?: string;
  error?: string;
}

export enum SaveUserError {
  'INCORRECT_PASSWORD' = 'Wrong password',
}

export interface PatchUserResponse {
  error?: string;
  user: User;
}
