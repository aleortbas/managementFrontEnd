import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './pages/products/productList';
import ProductDetail from './pages/products/ProductDetail';
import CreateProductForm from './pages/products/CreateProductForm';
import Categories from './pages/categories/CategoriesList';
import CategoryDetail from './pages/categories/CategoryDetail';
import LoginForm from './pages/login/login';
import CreatecategoryForm from './pages/categories/CreateCategoryForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/CreateProductForm" element={<CreateProductForm />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/CreateCategoryForm" element={<CreatecategoryForm />} />
        <Route path="/Categories/:id" element={<CategoryDetail />} />
        {/* <Route path="/Login" element={<LoginForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
