//returns phone number without spaces, dashes, etc
export const cleanPhoneNumber = (phoneNumber: string): string => {
  const phone = phoneNumber.replace(/\D/g, '');
  return phone;
};

//format seconds to hh:mm:ss
export const formatSeconds = (seconds: number): string => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substr(11, 8);
  return timeString;
};

export const saveCallDuration = (time: number): void => {
  localStorage.setItem('lastCallDuration', time.toString());
};

export const getCallDuration = (): number => {
  const time = localStorage.getItem('lastCallDuration');
  return time ? parseInt(time) : 0;
};

export const deleteCallDuration = (): void => {
  if (localStorage.getItem('lastCallDuration')) {
    localStorage.removeItem('lastCallDuration');
  }
};

export const savePhoneNumber = (phoneNumber: string): void => {
  localStorage.setItem('lastPhoneNumber', phoneNumber);
};

export const getPhoneNumber = (): string => {
  const phoneNumber = localStorage.getItem('lastPhoneNumber');
  return phoneNumber ? phoneNumber : '';
};

export const deletePhoneNumber = (): void => {
  if (localStorage.getItem('lastPhoneNumber')) {
    localStorage.removeItem('lastPhoneNumber');
  }
};
