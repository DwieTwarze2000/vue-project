export const getDate = (date: string): string => {
  const dateObject = new Date(date);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();

  return `${day}.${month}.${year}`;
};

export const getTime = (date: string): string => {
  const dateObject = new Date(date);
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};
