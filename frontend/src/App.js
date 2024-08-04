import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './Componentes/NavBar';
import NavbarFooter from './Componentes/NavBarFooter'; 
import ProductList from './Componentes/CardProducts';
import FormLogin from './Componentes/FormLogin';
import FormRegister from './Componentes/FormRegister';
import ProductDetail from './Componentes/ProductDetails';
import Carrito from './Componentes/Carrito';
import Carousel from './Componentes/Carousel';
import { AuthProvider } from './context/AuthContext';
import BestProducts from './Componentes/BestProducts';
import RecentProducts from './Componentes/RecentProducts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Carousel />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 2, width: '100%' }}>
                <BestProducts />
                <RecentProducts />
              </Container>
            </>
          } />
          <Route path="/login" element={
            <Container maxWidth="lg" sx={{ mt: 4, mb: 2, width: '100%' }}>
              <FormLogin />
            </Container>
          } />
          <Route path="/register" element={
            <Container maxWidth="lg" sx={{ mt: 4, mb: 2, width: '100%' }}>
              <FormRegister />
            </Container>
          } />
          <Route path="/products" element={
            <Container maxWidth="lg" sx={{ mt: 4, mb: 2, width: '100%' }}>
              <ProductList />
            </Container>
          } />
          <Route path="/products/:id" element={
            <Container maxWidth="lg" sx={{ mt: 4, mb: 2, width: '100%' }}>
              <ProductDetail />
            </Container>
          } />
          <Route path="/cart" element={
            <Container maxWidth="lg" sx={{ mt: 4, mb: 2, width: '100%' }}>
              <Carrito />
            </Container>
          } />
        </Routes>
        <NavbarFooter/>
      </Router>
    </AuthProvider>
  );
}

export default App;
