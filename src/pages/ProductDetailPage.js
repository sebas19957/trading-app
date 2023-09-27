import React, { useContext } from 'react';
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
import CartContext from '../context/CartContext';
import { getProducts } from '../services/productsService';
import { addProductCart } from '../services/cartService';

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
  const [quantity, setQuantity] = React.useState(1);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        console.log(response.data);
        const productosLS = [response.data]; // Agrega los datos al arreglo productosLS
        console.log(productosLS);

        const productFound = productosLS[0].find((prod) => prod.SKU === productId);

        if (productFound) {
          setProduct(productFound);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const addProduct = (multiplo) => {
    if (product.cantidad_disponible >= quantity + multiplo) {
      setQuantity(quantity + multiplo);
    }
  };

  const subtractProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      const response = await addProductCart(product, quantity);
      console.log(response);
      if (response.ok) {
        setCartCount(response?.data?.listaProductos?.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title> Product </title>
      </Helmet>

      <Container>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ width: '100px', height: '100px', color: 'black' }} />
            <Typography>Cargando producto...</Typography>
          </div>
        ) : (
          product?.length !== 0 && (
            <>
              <Container>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ position: 'relative' }}>
                      {product.cantidad_disponible === 0 && (
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

                      <StyledProductImg alt={product.nombre} src={product.cover} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      {product.nombre}
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 4 }}>
                      {fCurrency(product.precio_unitario)}
                    </Typography>
                    <Typography sx={{ mt: 4, mb: 2 }}>{product.descripcion}</Typography>

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
                        <Typography sx={{ fontSize: '12px' }}>Disponible: {product.cantidad_disponible}</Typography>
                      </div>
                    </Box>

                    <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />

                    <Box>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="container"
                          // sx={{ color: 'white' }}
                          disabled={product.cantidad_disponible === 0}
                          startIcon={<AddShoppingCartIcon />}
                          onClick={() => addToCart(product.SKU, quantity)}
                        >
                          Agregar al Carrito
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </>
          )
        )}
        {!product && <Typography>Producto NO encontrado</Typography>}
      </Container>
    </>
  );
}
