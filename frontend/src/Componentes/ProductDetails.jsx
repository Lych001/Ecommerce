import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Container, Button, Grid, Box } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('token'); 
            try {
                const response = await axios.get(`http://192.168.1.7:5000/api/products/${id}`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : ''
                    }
                });
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el producto', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Cargando detalles del producto...</div>;
    if (error) return <div>Error al cargar los detalles del producto</div>;

    return (
        <Container>
            <Card sx={{background:'none', border:'none'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            alt={product.nombre}
                            height="400"
                            image={product.imageUrl}
                            title={product.nombre}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h4" component="div" sx={{color:'white', fontWeight:'bold',fontFamily:'monospace'}}>
                                {product.nombre}
                            </Typography>
                            <Typography mt={2} variant="body1" color="text.secondary" sx={{color:'white', fontSize:12, fontFamily:'monospace'}}>
                                {product.descripcion}
                            </Typography>
                            <Box mt={2} sx={{ alignSelf: 'flex-end', width: '100%' }}>
                            <Typography variant="h6" component="div" sx={{color:'white', fontWeight:'bold', fontSize:30,fontFamily:'monospace'}}>
                                S/.{product.precio}
                            </Typography>
                            </Box>
                        </Box>
                            <Box sx={{ alignSelf: 'flex-end', width: '100%' }}>
                                <Button variant="contained" color="primary" sx={{width:'100%'}}>
                                    Agregar al carrito
                                </Button>
                            </Box>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default ProductDetail;
