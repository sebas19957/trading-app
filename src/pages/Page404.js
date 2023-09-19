import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Página no encontrada | Trading App </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Lo sentimos, ¡Página no encontrada!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Lo sentimos, no pudimos encontrar la página que estás buscando. ¿Quizás has escrito mal la URL? Asegúrese de
            revisar su ortografía.
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
            sx={{ textTransform: 'uppercase', backgroundColor: 'black' }}
          >
            Ir al Inicio
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
