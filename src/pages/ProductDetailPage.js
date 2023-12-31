import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Button, Container, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { fCurrency } from '../utils/formatNumber';
import Label from '../components/label';
import CartContext from '../context/CartContext';

// ----------------------------------------------------------------------
const StyledProductImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '5%',
});

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { setCartCount } = useContext(CartContext);
  const [product, setProduct] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  React.useEffect(() => {
    const productosLS = localStorage.getItem('products');

    if (productosLS) {
      const products = JSON.parse(productosLS);
      const allProducts = Object.values(products).flat();
      const productFound = allProducts.find((prod) => prod.SKU === productId);

      if (productFound) {
        setProduct(productFound);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [productId]);

  const addProduct = (multiplo) => {
    if (product.Cantidad >= quantity + multiplo) {
      setQuantity(quantity + multiplo);
    }
  };

  const subtractProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = (product, quantity) => {
    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.SKU === product.SKU);

    if (existingProduct) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      existingProduct.quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agrégalo como un nuevo elemento
      cart.push({ ...product, quantity });
    }

    // Guarda el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    const cartProducts = JSON.parse(localStorage.getItem('cart'));

    setCartCount(cartProducts.length);
  };

  return (
    <>
      <Helmet>
        <title> Product </title>
      </Helmet>

      <Container>
        {product?.length !== 0 && (
          <>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ position: 'relative' }}>
                    {product.Cantidad === 0 && (
                      <Label
                        variant="filled"
                        color="error"
                        sx={{
                          zIndex: 9,
                          top: 16,
                          right: 16,
                          position: 'absolute',
                          textTransform: 'uppercase',
                          paddingTop: '0px',
                        }}
                      >
                        No disponible
                      </Label>
                    )}

                    <StyledProductImg alt={product.Nombre} src={product.cover} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {product.Nombre}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 4 }}>
                    {fCurrency(product.PrecioUnitario)}
                  </Typography>
                  <Typography sx={{ mt: 4, mb: 2 }}>{product.Descripcion}</Typography>

                  <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '20px',
                    }}
                  >
                    <Typography>Cantidad:</Typography>
                    <div>
                      <Box
                        sx={{
                          display: 'flex',
                          width: product.SKU.startsWith('WE') ? '240px' : '120px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          height: '40px',
                          border: '1px solid rgba(0, 0, 0, 0.23)',
                          borderRadius: '10px',
                        }}
                      >
                        <IconButton onClick={subtractProduct} disabled={quantity === 1}>
                          <RemoveIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                        <Typography sx={{ fontSize: '15px' }}>{quantity}</Typography>
                        <IconButton onClick={() => addProduct(1)}>
                          <AddIcon sx={{ fontSize: '20px' }} />{' '}
                          {product.SKU.startsWith('WE') && <span style={{ fontSize: '10px' }}>x1</span>}
                        </IconButton>
                        {product.SKU.startsWith('WE') && (
                          <>
                            <IconButton onClick={() => addProduct(10)}>
                              <AddIcon sx={{ fontSize: '20px' }} /> <span style={{ fontSize: '10px' }}>x10</span>
                            </IconButton>
                            <IconButton onClick={() => addProduct(100)}>
                              <AddIcon sx={{ fontSize: '20px' }} /> <span style={{ fontSize: '10px' }}>x100</span>
                            </IconButton>
                          </>
                        )}
                      </Box>
                      <Typography sx={{ fontSize: '12px' }}>Disponible: {product.Cantidad}</Typography>
                    </div>
                  </Box>

                  <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />

                  <Box>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="container"
                        // sx={{ color: 'white' }}
                        disabled={product.Cantidad === 0}
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => addToCart(product, quantity)}
                      >
                        Agregar al Carrito
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
        {error && <Typography>Producto NO encontrado</Typography>}
      </Container>
    </>
  );
}
