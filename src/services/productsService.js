import axios from 'axios';
import { config } from '../config/secrets';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${config.API_URL}/tienda/productos`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};
