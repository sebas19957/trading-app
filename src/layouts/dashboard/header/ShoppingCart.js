import React from 'react';
import { Badge, Box, IconButton } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import Iconify from '../../../components/iconify';

const ShoppingCart = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const cartProducts = localStorage.getItem('cart');

    if (cartProducts) {
      const productosObjeto = JSON.parse(cartProducts);
      setProducts(productosObjeto);
    }
  }, []);

  console.log(products);

  return (
    <Box component={RouterLink} to={`/shopping-cart`} sx={{ textDecoration: 'none', color: 'black' }}>
      <IconButton>
        <Badge showZero badgeContent={products?.length} color="error" max={99}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} color="black" />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default ShoppingCart;
