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

export const saveCallDuration = (time: string): void => {
  localStorage.setItem('lastCallDuration', time.toString());
};

export const getCallDuration = (): string => {
  const time = localStorage.getItem('lastCallDuration');
  return time ? time : '00:00:00';
};

export const deleteCallDuration = (): void => {
  if (localStorage.getItem('lastCallDuration')) {
    localStorage.removeItem('lastCallDuration');
  }
};
