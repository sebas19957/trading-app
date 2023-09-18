import React from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: 'calc(100vh - 200px)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function UploadProductsPage() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [error, setError] = React.useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        try {
          const parsedData = JSON.parse(fileContent);

          console.log(parsedData);
          localStorage.setItem('products', JSON.stringify(parsedData));
          setError('Productos cargados exitosamente.');
        } catch (error) {
          console.error('Error al analizar el archivo JSON:', error);
          setError('Error al analizar el archivo JSON');
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <>
      <Helmet>
        <title> Subir Productos </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <div>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleFileUpload}>
              Subir Archivo
            </Button>
          </div>
          <Typography sx={{ mt: 4 }} color="green">
            {error}
          </Typography>
        </StyledContent>
      </Container>
    </>
  );
}
