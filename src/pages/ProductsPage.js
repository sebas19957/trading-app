import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// components
import { ProductList } from '../sections/@dashboard/products';

import { getProducts } from '../services/productsService';

export const PRODUCTS = {
  productosNormales: [
    {
      SKU: 'EA001',
      Nombre: 'Camiseta',
      Descripcion: 'Camiseta de algodón',
      Cantidad: 50,
      PrecioUnitario: 60000,
      cover: `/assets/images/products/normales/Camiseta.PNG`,
    },
    {
      SKU: 'EA002',
      Nombre: 'Pantalon',
      Descripcion: 'Pantalón vaquero',
      Cantidad: 30,
      PrecioUnitario: 120000,
      cover: `/assets/images/products/normales/Pantalon.PNG`,
    },
    {
      SKU: 'EA003',
      Nombre: 'Zapatos',
      Descripcion: 'Zapatos de cuero',
      Cantidad: 20,
      PrecioUnitario: 180000,
      cover: `/assets/images/products/normales/Zapatos.PNG`,
    },
    {
      SKU: 'EA004',
      Nombre: 'Bolso',
      Descripcion: 'Bolso de mano',
      Cantidad: 15,
      PrecioUnitario: 90000,
      cover: `/assets/images/products/normales/Bolso.PNG`,
    },
    {
      SKU: 'EA005',
      Nombre: 'Reloj',
      Descripcion: 'Reloj de pulsera',
      Cantidad: 10,
      PrecioUnitario: 150000,
      cover: `/assets/images/products/normales/Reloj.PNG`,
    },
  ],
  productosPeso: [
    {
      SKU: 'WE001',
      Nombre: 'Manzanas',
      Descripcion: 'Manzanas frescas',
      Cantidad: 100,
      PrecioUnitario: 2500,
      cover: `/assets/images/products/peso/Manzanas.PNG`,
    },
    {
      SKU: 'WE002',
      Nombre: 'Platanos',
      Descripcion: 'Plátanos maduros',
      Cantidad: 80,
      PrecioUnitario: 2000,
      cover: `/assets/images/products/peso/Platanos.PNG`,
    },
    {
      SKU: 'WE003',
      Nombre: 'Naranjas',
      Descripcion: 'Naranjas jugosas',
      Cantidad: 120,
      PrecioUnitario: 3500,
      cover: `/assets/images/products/peso/Naranjas.PNG`,
    },
    {
      SKU: 'WE004',
      Nombre: 'Uvas',
      Descripcion: 'Uvas sin semillas',
      Cantidad: 60,
      PrecioUnitario: 4000,
      cover: `/assets/images/products/peso/Uvas.PNG`,
    },
    {
      SKU: 'WE005',
      Nombre: 'Sandías',
      Descripcion: 'Sandías dulces',
      Cantidad: 40,
      PrecioUnitario: 15000,
      cover: `/assets/images/products/peso/Sandías.PNG`,
    },
  ],
  productosDescuentoEspecial: [
    {
      SKU: 'SP001',
      Nombre: 'Libro',
      Descripcion: 'Libro de aventuras',
      Cantidad: 20,
      PrecioUnitario: 50000,
      cover: `/assets/images/products/descuento/Libro.PNG`,
    },
    {
      SKU: 'SP002',
      Nombre: 'Película',
      Descripcion: 'DVD de película clásica',
      Cantidad: 30,
      PrecioUnitario: 250000,
      cover: `/assets/images/products/descuento/DVD.PNG`,
    },
    {
      SKU: 'SP003',
      Nombre: 'Juego de mesa',
      Descripcion: 'Juego de mesa para toda la familia',
      Cantidad: 15,
      PrecioUnitario: 75000,
      cover: `/assets/images/products/descuento/Juego.PNG`,
    },
    {
      SKU: 'SP004',
      Nombre: 'Auriculares',
      Descripcion: 'Auriculares inalámbricos',
      Cantidad: 25,
      PrecioUnitario: 150000,
      cover: `/assets/images/products/descuento/Auriculares.PNG`,
    },
    {
      SKU: 'SP005',
      Nombre: 'Cámara',
      Descripcion: 'Cámara digital compacta',
      Cantidad: 10,
      PrecioUnitario: 1150000,
      cover: `/assets/images/products/descuento/Camara.PNG`,
    },
  ],
};

export default function ProductsPage() {
  const [productosNormales, setProductosNormales] = React.useState([]);
  const [productosPeso, setProductosPeso] = React.useState([]);
  const [productosDescuentoEspecial, setProductosDescuentoEspecial] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        setProductosNormales(response.data.filter((producto) => producto.SKU.startsWith('EA')));
        setProductosPeso(response.data.filter((producto) => producto.SKU.startsWith('WE')));
        setProductosDescuentoEspecial(response.data.filter((producto) => producto.SKU.startsWith('SP')));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Productos </title>
      </Helmet>

      <Container>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ width: '100px', height: '100px', color: 'black' }} />
            <Typography>Cargando productos...</Typography>
          </div>
        ) : productosNormales.length !== 0 || productosPeso.length !== 0 || productosDescuentoEspecial.length !== 0 ? (
          <>
            <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
              Productos Normales
            </Typography>
            <ProductList products={productosNormales} />

            <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>
              Productos de Peso
            </Typography>
            <ProductList products={productosPeso} />

            <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>
              Productos con Descuentos
            </Typography>
            <ProductList products={productosDescuentoEspecial} />
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
              <img src="/assets/response/no_data.png" alt="no_data" />
              <Typography sx={{ textAlign: 'center', mt: -4 }} variant="h4">
                No hay productos agregados
              </Typography>
              <Button
                sx={{ mt: 3, textTransform: 'uppercase', backgroundColor: 'black' }}
                variant="contained"
                onClick={() => navigate('/upload-products')}
              >
                Agregar Productos
              </Button>
            </Box>
          </div>
        )}
      </Container>
    </>
  );
}
