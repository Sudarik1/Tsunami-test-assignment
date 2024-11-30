import axios from 'axios';

export const getContactsData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data.map((user) => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    }));
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};