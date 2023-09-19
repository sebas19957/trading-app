import React from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button, Container, Typography } from '@mui/material';

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
  const [fileName, setFileName] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        try {
          const parsedData = JSON.parse(fileContent);

          localStorage.setItem('products', JSON.stringify(parsedData));
          setMessage('Productos cargados exitosamente.');
        } catch (error) {
          console.error('Error al analizar el archivo JSON:', error);
          setMessage('Error al analizar el archivo JSON');
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box component="label" sx={{ cursor: 'pointer' }}>
              <img src="/assets/response/upload.PNG" alt="Cargar archivo" style={{ width: '200px', height: '200px' }} />
              <input type="file" id="fileInput" accept=".txt" onChange={handleFileChange} style={{ display: 'none' }} />
              <Typography sx={{ mt: -3 }}>{fileName}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
              sx={{ mt: 2, backgroundColor: 'black', textTransform: 'uppercase' }}
              startIcon={<FileUploadIcon />}
            >
              Subir Archivo
            </Button>
          </div>
          <Typography sx={{ mt: 4 }} color="green">
            {message}
          </Typography>
        </StyledContent>
      </Container>
    </>
  );
}
