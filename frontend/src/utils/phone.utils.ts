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

//temp
export const saveCallDuration = (time: string): void => {
  localStorage.setItem('lastCallDuration', time.toString());
};
