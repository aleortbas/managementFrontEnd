import axios from 'axios';

export const getCategories = () => {
  return axios.get('http://localhost:5000/api/categories'); 
};

export const createCategoriesService = (data: {
  name: string;
}) => {
  return axios.post('http://localhost:5000/api/Categories', data);
}

export const updateCategoriesService = (id: string, data: {
  name: string;
}) => {
  return axios.put(`http://localhost:5000/api/categories/${id}`, data);
}

export const deleteCategoriesService = (id: string) => {
  return axios.delete(`http://localhost:5000/api/categories/${id}`);
}