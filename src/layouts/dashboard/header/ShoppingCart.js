import React, { useContext } from 'react';
import { Badge, Box, IconButton } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import CartContext from '../../../context/CartContext';

import Iconify from '../../../components/iconify';

const ShoppingCart = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <Box component={RouterLink} to={`/shopping-cart`} sx={{ textDecoration: 'none', color: 'black' }}>
      <IconButton>
        <Badge showZero badgeContent={cartCount} color="error" max={99}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} color="black" />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default ShoppingCart;
