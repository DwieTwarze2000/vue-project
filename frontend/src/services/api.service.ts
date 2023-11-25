//vue
const apiUrl = 'http://localhost:3000/';

export const defaultPost = async (
  endpoint: string,
  data: any
): Promise<any> => {
  const response = await fetch(apiUrl + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
