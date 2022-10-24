import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Product from './components/Product';
import SellerProducts from './components/SellerProducts';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<Product />} />
        <Route exact path="/products/sellers" element={<SellerProducts />} />
        <Route exact path="/products/sellers/add" element={<AddProduct />} />
        <Route exact path="/products/sellers/update/:id" element={<UpdateProduct />} />
      </Routes>
    </>
  );
}

export default App;
