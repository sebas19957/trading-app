import React from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Button, CircularProgress, Container, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { fCurrency } from '../utils/formatNumber';
import Label from '../components/label';

// ----------------------------------------------------------------------
const StyledProductImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '5%',
});

export default function ShoppingCartPage() {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    const cartProducts = localStorage.getItem('cart');

    if (cartProducts) {
      const productosObjeto = JSON.parse(cartProducts);
      setProducts(productosObjeto);
      setCart(productosObjeto);
    }
  }, []);

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = [...cart];
    const product = updatedCart[index];
    if (quantity >= 0 && quantity <= product.Cantidad) {
      product.quantity = quantity;
      setCart(updatedCart);
    }
  };

  const handlePay = () => {
    const updatedProducts = [...products];

    cart.forEach((cartProduct) => {
      const productIndex = updatedProducts.findIndex((product) => product.SKU === cartProduct.SKU);
      if (productIndex !== -1) {
        updatedProducts[productIndex].Cantidad -= cartProduct.quantity;
      }
    });

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Actualiza el carrito eliminando los productos comprados
    const updatedCart = cart.filter((cartProduct) => cartProduct.quantity > 0);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setProducts(updatedProducts);
    setCart(updatedCart);
  };

  const calculateDiscount = () => {
    let discount = 0;
    cart.forEach((cartProduct) => {
      const product = products.find((product) => product.SKU === cartProduct.SKU);
      if (product && product.SKU.startsWith('SP')) {
        const eligibleQuantity = Math.floor(cartProduct.quantity / 3);
        discount += eligibleQuantity * (product.PrecioUnitario * 0.2);
        discount = Math.min(discount, cartProduct.quantity * (product.PrecioUnitario * 0.5));
      }
    });
    return discount;
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((cartProduct) => {
      const product = products.find((product) => product.SKU === cartProduct.SKU);
      if (product) {
        if (product.SKU.startsWith('EA')) {
          total += product.PrecioUnitario * cartProduct.quantity;
        } else if (product.SKU.startsWith('WE')) {
          total += (product.PrecioUnitario / 1000) * cartProduct.quantity;
        } else if (product.SKU.startsWith('SP')) {
          const discount = Math.min(Math.floor(cartProduct.quantity / 3) * 0.2, 0.5);
          total += product.PrecioUnitario * (1 - discount) * cartProduct.quantity;
        }
      }
    });
    return total;
  };

  return (
    <>
      <Helmet>
        <title>Carrito de Compras</title>
      </Helmet>

      <Container>
        {cart.length !== 0 && (
          <>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  {cart.map((product, index) => (
                    <React.Fragment key={product.SKU}>
                      <Grid item container sx={{ mb: 4 }}>
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ width: '120px', height: '120px' }}>
                            <StyledProductImg alt={product.Nombre} src={product.cover} />
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="h4">{product.Nombre}</Typography>
                            <Typography>{product.Descripcion}</Typography>

                            <Box
                              sx={{
                                display: { xs: 'none', sm: 'block' },
                                width: '100%',
                                alignItems: 'center',
                                marginTop: '15px',
                              }}
                            >
                              <Typography>Cantidad:</Typography>
                              <div>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    width: '140px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    height: '40px',
                                    border: '1px solid rgba(0, 0, 0, 0.23)',
                                    borderRadius: '10px',
                                  }}
                                >
                                  <IconButton onClick={() => handleQuantityChange(index, product.quantity - 1)}>
                                    <RemoveIcon />
                                  </IconButton>
                                  <Typography>{product.quantity}</Typography>
                                  <IconButton onClick={() => handleQuantityChange(index, product.quantity + 1)}>
                                    <AddIcon />
                                  </IconButton>
                                </Box>
                                <Typography sx={{ fontSize: '12px' }}>Disponible: {product.Cantidad}</Typography>
                              </div>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                          <Box>
                            <Box
                              sx={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: '15px',
                              }}
                            >
                              <Typography>Cantidad:</Typography>
                              <div>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    width: '140px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    height: '40px',
                                    border: '1px solid rgba(0, 0, 0, 0.23)',
                                    borderRadius: '10px',
                                  }}
                                >
                                  <IconButton onClick={() => handleQuantityChange(index, product.quantity - 1)}>
                                    <RemoveIcon />
                                  </IconButton>
                                  <Typography>{product.quantity}</Typography>
                                  <IconButton onClick={() => handleQuantityChange(index, product.quantity + 1)}>
                                    <AddIcon />
                                  </IconButton>
                                </Box>
                                <Typography sx={{ fontSize: '12px' }}>Disponible: {product.Cantidad}</Typography>
                              </div>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ mb: 3 }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>
                              &nbsp;{fCurrency(product.PrecioUnitario)}
                            </Typography>
                            <Typography sx={{ fontSize: '13px' }}>Valor unitario</Typography>
                          </Box>

                          <Box sx={{ mb: 3 }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>
                              &nbsp;{fCurrency(0)} {/* Cambiar 0 por calculateDiscount() */}
                            </Typography>
                            <Typography sx={{ fontSize: '13px' }}>Descuento</Typography>
                          </Box>

                          <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>
                            &nbsp;{fCurrency(product.PrecioUnitario * product.quantity)}
                          </Typography>
                          <Typography sx={{ fontSize: '13px' }}>Total</Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />
                    </React.Fragment>
                  ))}
                </Grid>
                <Grid item xs={12} sm={4} sx={{ borderLeft: '1px dashed rgba(145, 158, 171, 0.24)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>Subtotal: {fCurrency(calculateTotal())}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>Descuentos: {fCurrency(calculateDiscount())}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>Total: {fCurrency(calculateTotal() - calculateDiscount())}</Typography>
                  </Box>

                  <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />

                  <Button variant="contained" fullWidth sx={{ backgroundColor: 'black' }} onClick={handlePay}>
                    Pagar
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
        {cart.length === 0 && <Typography>Producto NO encontrado</Typography>}
      </Container>
    </>
  );
}
