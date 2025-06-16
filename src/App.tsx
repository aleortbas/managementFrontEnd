import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/products/productList";
import ProductDetail from "./pages/products/ProductDetail";
import CreateProductForm from "./pages/products/CreateProductForm";
import Categories from "./pages/categories/CategoriesList";
import CategoryDetail from "./pages/categories/CategoryDetail";
import RegisterForm from "./pages/login/registerUser";
import CreatecategoryForm from "./pages/categories/CreateCategoryForm";
import CartPage from "./pages/cart/cartPage";
import Navbar from "./components/navbar";
import LoginForm from "./pages/login/login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<ProductList />} />
        <Route path="/RegisterUser" element={<RegisterForm />} />
        <Route path="/Login" element={<LoginForm />} />

        {/* Protected */}

        <Route
          path="/CreateProductForm"
          element={
            <ProtectedRoute>
              <CreateProductForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/CreateCategoryForm"
          element={
            <ProtectedRoute>
              <CreatecategoryForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Categories/:id"
          element={
            <ProtectedRoute>
              <CategoryDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
