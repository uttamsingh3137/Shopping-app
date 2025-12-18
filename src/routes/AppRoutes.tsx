import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "./ProtectedRoute";
import OrderSuccess from "../pages/OrderSuccess";
import Wishlist from "../pages/Wishlist";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product-details" element={<ProductDetails />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/wishlist" element={<Wishlist />} />

    </Routes>
  );
};

export default AppRoutes;
