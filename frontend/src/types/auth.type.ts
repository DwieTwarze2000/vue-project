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
  message?: string;
  _id: string;
  login: string;
  password: string;
  mainPhoneNumber: string;
  createdAt: string;
  phoneNumbers?: UserPhones[];
}

export interface RegisterResponseFail {
  message: string;
}

export interface UserPhones {
  phoneNumber: string;
  name: string;
}
