import axios from 'axios';

export const addToCartService = (data: { product_id: string; quantity: number }) => {
  return axios.post("http://localhost:5000/api/cart", data);
};

export const getCartService = () => {
  return axios.get("http://localhost:5000/api/cart");
};

export const checkout = () => {
  return axios.get("http://localhost:5000/api/cart");
};