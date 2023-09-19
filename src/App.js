import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import CartContext from './context/CartContext';

// ----------------------------------------------------------------------

export default function App() {
  const [cartCount, setCartCount] = React.useState(0);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </CartContext.Provider>
  );
}
