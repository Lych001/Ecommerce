import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: '#0D1B2A',
        color: '#ECEEF0',
      }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                textShadow: '2px 2px 2px #1E88E5',
                letterSpacing: '.3rem',
                color: 'inherit',
              }}
            >
              TIENDA TRENDING
            </Typography>
            <Typography variant="body2" sx={{ color: '#C4C4C4' }}>
              Aquí puedes agregar una breve descripción de tu empresa o sitio web de e-commerce.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                textShadow: '2px 2px 2px #1E88E5',
                letterSpacing: '.15rem',
                color: 'inherit',
              }}
            >
              Páginas
            </Typography>
            <Box>
              <Link href="/" color="inherit" sx={{ color: '#C4C4C4', fontWeight: 'bold', '&:hover': { color: '#ECEEF0' } }}>
                Inicio
              </Link>
            </Box>
            <Box>
              <Link href="/about" color="inherit" sx={{ color: '#C4C4C4', fontWeight: 'bold', '&:hover': { color: '#ECEEF0' } }}>
                Acerca de
              </Link>
            </Box>
            <Box>
              <Link href="/contact" color="inherit" sx={{ color: '#C4C4C4', fontWeight: 'bold', '&:hover': { color: '#ECEEF0' } }}>
                Contacto
              </Link>
            </Box>
            <Box>
              <Link href="/terms" color="inherit" sx={{ color: '#C4C4C4', fontWeight: 'bold', '&:hover': { color: '#ECEEF0' } }}>
                Términos y Condiciones
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                textShadow: '2px 2px 2px #1E88E5',
                letterSpacing: '.15rem',
                color: 'inherit',
              }}
            >
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ color: '#C4C4C4' }}>
              Email: info@ecommerce.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#C4C4C4' }}>
              Teléfono: +1 (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" sx={{ color: '#C4C4C4' }}>
            &copy; {new Date().getFullYear()} Tienda Trending. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
