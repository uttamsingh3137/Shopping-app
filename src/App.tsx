import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <AppRoutes />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
