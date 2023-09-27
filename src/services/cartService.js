import axios from 'axios';

import { config } from '../config/secrets';

export const addProductCart = async (SKU, cantidad) => {
  try {
    const response = await axios.post(
      `${config.API_URL}/tienda/carrito/agregar?idUsuario=Jose&SKU=${SKU}&cantidad=${cantidad}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

export const payProductsCart = async () => {
  try {
    const response = await axios.post(`${config.API_URL}/tienda/carrito/pagar?idUsuario=Jose`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

export const deleteProductCart = async (SKU, cantidad) => {
  try {
    const response = await axios.delete(
      `${config.API_URL}/tienda/carrito/eliminar?idUsuario=Jose&SKU=${SKU}&cantidad=${cantidad}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};
