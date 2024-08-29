import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './layout/header-footer/nav';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/homepage';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import About from './layout/about/about';
import ChiTietSanPham from './layout/merchandise/test';
import Register from './layout/User/register';
import ActiveAccount from './layout/User/activeaccount';
import KichHoatTaiKhoan from './layout/User/Activate';
import Login from './layout/User/login';
import Test from './layout/User/Test';
import ProductForm from './admin/ProductForm';
import  { Cart } from './layout/merchandise/components/Cart';
import CartItemModel from './model/cartitemModel';
import { AuthProvider } from './layout/utils/AuthContext';
import { ConfirmProvider } from "material-ui-confirm";
import ProductForm_Admin from './admin/ProductForm';
import { CartItemProvide } from './layout/utils/UseCartItemContext';
function App() {
  const [keyword, setKeyword] = useState('');
    //Xu Li Gio Hang
    const[cartList , setCartList] = useState<CartItemModel[]>([]);
    const[totalCart, setTotalCart] = useState(0);
    useEffect(() =>{
      const cartData: string|null = localStorage.getItem("cart");
      let cart: CartItemModel[] = [];
      cart = cartData ? JSON.parse(cartData):[];
      setCartList(cart);
      setTotalCart(cart.length);
    },[])
    // // Xu li an hien navbar va footer
    // const location = useLocation();
    // //Kiem tra neu duong dan bat dau "/admin"
    // const isAdminPath = location.pathname.startsWith("/admin");

  return (
    
    <div className='App'>
      <BrowserRouter>
       <AuthProvider>
          <CartItemProvide>
          <ConfirmProvider>
          <Navbar keyword={keyword} setKeyword={setKeyword} />
        <Routes >
          <Route path='/' element={<HomePage keyword={keyword} />}/>
          <Route path='/:idCate' element={<HomePage keyword={keyword} />} />
          <Route path='/' element={<About />} />
          <Route path='/product/:idProduct' element={<ChiTietSanPham />} />
          <Route path='/register' element={<Register />} />
          <Route path='/activate/:email/:activeId' element={<KichHoatTaiKhoan/>} />
          <Route path='/login' element={<Login setTotalCart={setTotalCart} />} />
          <Route path='/test' element={<Test />} />
          <Route path='/admin/addproduct' element={<ProductForm_Admin />} />
          <Route path='/cart' element={<Cart />} />

        </Routes>
        
        <Footer />
          </ConfirmProvider>
          </CartItemProvide>
       </AuthProvider>
        {/* <Navbar keyword={keyword} setKeyword={setKeyword} />
        <Routes >
          <Route path='/' element={<HomePage keyword={keyword} />}/>
          <Route path='/:idCate' element={<HomePage keyword={keyword} />} />
          <Route path='/' element={<About />} />
          <Route path='/product/:idProduct' element={<ChiTietSanPham />} />
          <Route path='/register' element={<Register />} />
          <Route path='/activate/:email/:activeId' element={<KichHoatTaiKhoan/>} />
          <Route path='/login' element={<Login setTotalCart={setTotalCart} />} />
          <Route path='/test' element={<Test />} />
          <Route path='/admin/addproduct' element={<ProductForm />} />
          <Route path='/cart' element={<Cart />} />

        </Routes>
        
        <Footer /> */}
      </BrowserRouter>

    </div>
  );
}

export default App;