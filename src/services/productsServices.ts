import axios from 'axios';

export const getProducts = () => {
  return axios.get('http://localhost:5000/api/products'); 
};

export const createProductService = (data: {
  name: string;
  description: string;
  price: number;
  category_id: string;
}) => {
  return axios.post('http://localhost:5000/api/products', data);
}

export const updateProductService = (id: string, data: {
  name: string;
  description: string;
  price: number;
  category_id: string;
}) => {
  return axios.put(`http://localhost:5000/api/products/${id}`, data);
}

export const deleteProductService = (id: string) => {
  return axios.delete(`http://localhost:5000/api/products/${id}`);
}