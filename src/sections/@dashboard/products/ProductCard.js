import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink as RouterLink } from 'react-router-dom';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { SKU, descripcion, precio_unitario: precioUnitario, cover } = product;

  return (
    <Card sx={{ cursor: 'pointer' }}>
      <Box component={RouterLink} to={`/products/${SKU}`} sx={{ textDecoration: 'none', color: 'black' }}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {SKU.includes('SP') && (
            <Label
              variant="filled"
              color="error"
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
              }}
            >
              Promoción
            </Label>
          )}
          <StyledProductImg alt={descripcion} src={cover} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover">
            <Typography variant="subtitle2" noWrap>
              {descripcion}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">
              {fCurrency(precioUnitario)}
              {SKU.startsWith('WE') && <span> x g</span>}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
