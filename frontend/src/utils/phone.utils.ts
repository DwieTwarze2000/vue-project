//returns phone number without spaces, dashes, etc
export const cleanPhoneNumber = (phoneNumber: string): string => {
  const phone = phoneNumber.replace(/\D/g, '');
  return phone;
};
