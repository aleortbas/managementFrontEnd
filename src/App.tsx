import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './pages/products/productList';
import ProductDetail from './pages/products/ProductDetail';
import CreateProductForm from './pages/products/CreateProductForm';
import Categories from './pages/categories/CategoriesDetail';
import LoginForm from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/CreateProductForm" element={<CreateProductForm />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Categories/:id" element={<Categories />} />
        {/* <Route path="/Login" element={<LoginForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
