//return phone number without spaces, dashes, etc
export const formatPhoneNumber = (phoneNumber: string): string => {
  const phone = phoneNumber.replace(/\D/g, '');
  return phone;
};
