import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './pages/products/productList';
import ProductDetail from './pages/products/ProductDetail';
import CreateProductForm from './pages/products/CreateProductForm';
import Categories from './pages/categories/CategoriesList';
import CategoryDetail from './pages/categories/CategoryDetail';
import RegisterForm from './pages/login/registerUser';
import CreatecategoryForm from './pages/categories/CreateCategoryForm';
import CartPage from './pages/cart/cartPage';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/CreateProductForm" element={<CreateProductForm />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/CreateCategoryForm" element={<CreatecategoryForm />} />
        <Route path="/Categories/:id" element={<CategoryDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
