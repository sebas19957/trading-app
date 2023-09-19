import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { fCurrency } from '../utils/formatNumber';
import CartContext from '../context/CartContext';

// ----------------------------------------------------------------------
const StyledProductImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '5%',
});

export default function ShoppingCartPage() {
  const [products, setProducts] = React.useState([]);
  const { setCartCount } = useContext(CartContext);
  const [cart, setCart] = React.useState([]);
  const navigate = useNavigate();

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
    if (quantity >= 1 && quantity <= product.Cantidad) {
      product.quantity = quantity;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handlePay = () => {
    // Obtener la lista de productos y el carrito del localStorage
    const products = JSON.parse(localStorage.getItem('products'));
    const cart = JSON.parse(localStorage.getItem('cart'));

    // Recorrer el carrito y actualizar la cantidad de productos comprados en la lista de productos
    cart.forEach((item) => {
      const product =
        products?.productosNormales.find((p) => p.SKU === item.SKU) ||
        products?.productosPeso.find((p) => p.SKU === item.SKU) ||
        products?.productosDescuentoEspecial.find((p) => p.SKU === item.SKU);
      if (product) {
        // Restar la cantidad comprada a la cantidad disponible del producto
        product.Cantidad -= item.quantity;
      }
    });

    // Actualizar la lista de productos en el localStorage
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.removeItem('cart');

    setCartCount(0);

    // Redireccionar a la página de respuesta
    navigate('/products');
  };

  const calculateDiscount = () => {
    let discount = 0;
    cart.forEach((cartProduct) => {
      const product = products.find((product) => product.SKU === cartProduct.SKU);
      if (product && product.SKU.startsWith('SP')) {
        // const eligibleQuantity = Math.floor(cartProduct.quantity / 3);
        // discount += eligibleQuantity * (product.PrecioUnitario * 0.2);
        // discount = Math.min(discount, cartProduct.quantity * (product.PrecioUnitario * 0.5));

        let cantidadDescuentos = Math.floor(product.quantity / 3);

        // Verificar si se aplicarán más de 2 descuentos
        if (cantidadDescuentos > 2) {
          cantidadDescuentos = 2;
        }

        // Calcular el descuento total
        let descuentoTotal = cantidadDescuentos * 0.2;

        // Verificar si el descuento total supera el 50%
        if (descuentoTotal > 0.5) {
          descuentoTotal = 0.5;
        }

        discount += product.PrecioUnitario * product.quantity * descuentoTotal;
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
          total += product.PrecioUnitario * product.quantity;
        } else if (product.SKU.startsWith('SP')) {
          let cantidadDescuentos = Math.floor(product.quantity / 3);

          // Verificar si se aplicarán más de 2 descuentos
          if (cantidadDescuentos > 2) {
            cantidadDescuentos = 2;
          }

          // Calcular el descuento total
          let descuentoTotal = cantidadDescuentos * 0.2;

          // Verificar si el descuento total supera el 50%
          if (descuentoTotal > 0.5) {
            descuentoTotal = 0.5;
          }
          total += product.PrecioUnitario * product.quantity * (1 - descuentoTotal);
        }
      }
    });
    return total;
  };

  const calculateTotalByProduct = (productToCalculate) => {
    let total = 0;
    const product = cart.find((cartProduct) => cartProduct.SKU === productToCalculate.SKU);
    if (product) {
      if (product.SKU.startsWith('EA')) {
        total = product.PrecioUnitario * product.quantity;
      } else if (product.SKU.startsWith('WE')) {
        // const valorGramo = product.PrecioUnitario * product.quantity;
        // const cantidadEnKilogramos = cantidadEnKilogramos * valorGramo;
        total = product.PrecioUnitario * product.quantity;
      } else if (product.SKU.startsWith('SP')) {
        let cantidadDescuentos = Math.floor(product.quantity / 3);

        // Verificar si se aplicarán más de 2 descuentos
        if (cantidadDescuentos > 2) {
          cantidadDescuentos = 2;
        }

        // Calcular el descuento total
        let descuentoTotal = cantidadDescuentos * 0.2;

        // Verificar si el descuento total supera el 50%
        if (descuentoTotal > 0.5) {
          descuentoTotal = 0.5;
        }

        total = product.PrecioUnitario * product.quantity * (1 - descuentoTotal);
      }
    }

    return total;
  };

  const calculateDiscountByProduct = (productToCalculate) => {
    let total = 0;
    const product = cart.find((cartProduct) => cartProduct.SKU === productToCalculate.SKU);
    if (product) {
      if (product.SKU.startsWith('SP')) {
        let cantidadDescuentos = Math.floor(product.quantity / 3);

        // Verificar si se aplicarán más de 2 descuentos
        if (cantidadDescuentos > 2) {
          cantidadDescuentos = 2;
        }

        // Calcular el descuento total
        let descuentoTotal = cantidadDescuentos * 0.2;

        // Verificar si el descuento total supera el 50%
        if (descuentoTotal > 0.5) {
          descuentoTotal = 0.5;
        }

        total = product.PrecioUnitario * product.quantity * descuentoTotal;
      }
    }

    return total;
  };

  const handleDeleteProduct = (sku) => {
    // Eliminar el producto del localStorage
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    const updatedCart = cartProducts.filter((product) => product.SKU !== sku);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Eliminar el producto del carrito en el estado
    setCart(updatedCart);

    const cartProductsUpdate = JSON.parse(localStorage.getItem('cart'));
    setCartCount(cartProductsUpdate.length);
  };

  return (
    <>
      <Helmet>
        <title>Carrito de Compras</title>
      </Helmet>

      <Container>
        {cart.length !== 0 ? (
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
                            <Button
                              variant="contained"
                              fullWidth
                              color="error"
                              sx={{ mt: 1 }}
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDeleteProduct(product.SKU)}
                            >
                              Eliminar
                            </Button>
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
                                    width: product.SKU.startsWith('WE') ? '230px' : '120px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    height: '40px',
                                    border: '1px solid rgba(0, 0, 0, 0.23)',
                                    borderRadius: '10px',
                                  }}
                                >
                                  <IconButton onClick={() => handleQuantityChange(index, product.quantity - 1)}>
                                    <RemoveIcon sx={{ fontSize: '20px' }} />
                                  </IconButton>
                                  <Typography sx={{ fontSize: '15px' }}>{product.quantity}</Typography>
                                  <IconButton onClick={() => handleQuantityChange(index, product.quantity + 1)}>
                                    <AddIcon sx={{ fontSize: '20px' }} />
                                    {product.SKU.startsWith('WE') && <span style={{ fontSize: '10px' }}>x1</span>}
                                  </IconButton>
                                  {product.SKU.startsWith('WE') && (
                                    <>
                                      <IconButton onClick={() => handleQuantityChange(index, product.quantity + 10)}>
                                        <AddIcon sx={{ fontSize: '20px' }} />
                                        <span style={{ fontSize: '10px' }}>x10</span>
                                      </IconButton>
                                      <IconButton onClick={() => handleQuantityChange(index, product.quantity + 100)}>
                                        <AddIcon sx={{ fontSize: '20px' }} />
                                        <span style={{ fontSize: '10px' }}>x100</span>
                                      </IconButton>
                                    </>
                                  )}
                                </Box>
                                <Typography sx={{ fontSize: '12px' }}>Disponible: {product.Cantidad}</Typography>
                              </div>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sx={{ display: { xs: 'flex', sm: 'none' }, marginTop: '50px' }}>
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
                                    width: product.SKU.startsWith('WE') ? '245px' : '120px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    height: '40px',
                                    border: '1px solid rgba(0, 0, 0, 0.23)',
                                    borderRadius: '10px',
                                  }}
                                >
                                  <IconButton onClick={() => handleQuantityChange(index, product.quantity - 1)}>
                                    <RemoveIcon sx={{ fontSize: '20px' }} />
                                  </IconButton>
                                  <Typography sx={{ fontSize: '15px' }}>{product.quantity}</Typography>
                                  <IconButton onClick={() => handleQuantityChange(index, product.quantity + 1)}>
                                    <AddIcon />
                                  </IconButton>
                                  {product.SKU.startsWith('WE') && (
                                    <>
                                      <IconButton onClick={() => handleQuantityChange(index, product.quantity + 10)}>
                                        <AddIcon sx={{ fontSize: '20px' }} />{' '}
                                        <span style={{ fontSize: '12px' }}>x10</span>
                                      </IconButton>
                                      <IconButton onClick={() => handleQuantityChange(index, product.quantity + 100)}>
                                        <AddIcon sx={{ fontSize: '20px' }} />{' '}
                                        <span style={{ fontSize: '12px' }}>x100</span>
                                      </IconButton>
                                    </>
                                  )}
                                </Box>
                                <Typography sx={{ fontSize: '12px' }}>Disponible: {product.Cantidad}</Typography>
                              </div>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ mb: 3 }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>
                              {fCurrency(product.PrecioUnitario)}
                            </Typography>
                            <Typography sx={{ fontSize: '13px' }}>Valor unitario</Typography>
                          </Box>

                          <Box sx={{ mb: 3, display: calculateDiscountByProduct(product) === 0 && 'none' }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: 'bold', color: 'green' }}>
                              {fCurrency(calculateDiscountByProduct(product))} {/* Cambiar 0 por calculateDiscount() */}
                            </Typography>
                            <Typography sx={{ fontSize: '13px' }}>Descuento</Typography>
                          </Box>

                          <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>
                            {fCurrency(calculateTotalByProduct(product))}
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
                    <Typography>
                      Subtotal:
                      <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                        {fCurrency(calculateTotal() + calculateDiscount())}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>
                      Descuentos:
                      <span style={{ fontWeight: 'bold', marginLeft: '5px', color: 'green' }}>
                        {fCurrency(calculateDiscount())}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>
                      Total a pagar:
                      <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>{fCurrency(calculateTotal())}</span>
                    </Typography>
                  </Box>

                  <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: 'black' }}
                    onClick={handlePay}
                    startIcon={<PaymentIcon />}
                  >
                    Pagar
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 'calc(100vh - 200px)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <img src="/assets/response/empty_cart.png" alt="empty_cart" />
              <Typography sx={{ textAlign: 'center', mt: -4 }} variant="h4">
                No hay productos agregados al carrito
              </Typography>
              <Button
                sx={{ mt: 3, textTransform: 'uppercase', backgroundColor: 'black' }}
                variant="contained"
                onClick={() => navigate('/products')}
              >
                Ir al incio
              </Button>
            </Box>
          </div>
        )}
      </Container>
    </>
  );
}
