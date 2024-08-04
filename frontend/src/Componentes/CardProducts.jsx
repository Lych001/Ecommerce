import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Grid, Container, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImage from '../imagesFront/CardsFonts.png';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(''); 
    const [categories, setCategories] = useState([]); 
    const filteredProducts = category ? products.filter(product => product.categoria === category) : products;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://192.168.1.7:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error al obtener categorías', error);
            }
        };
        
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://192.168.1.7:5000/api/products', {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : ''
                    },
                    params: {
                        category 
                    }
                });
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener productos', error);
                setError(error);
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, [category]);

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://192.168.1.7:5000/api/cart', {
                productId,
                quantity: 1
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });
            if (response.status === 200) {
                console.log('Producto añadido al carrito');
            }
        } catch (error) {
            console.error('Error al agregar producto al carrito', error);
        }
    };

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error al cargar productos</div>;

    return (
        <Container>
            <FormControl fullWidth margin="normal" sx={{borderColor:'white', background:'white'}}>
                <InputLabel >Filtrar por categoría</InputLabel>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Filtrar por categoría"
                >
                    <MenuItem value=""><em>Todos</em></MenuItem>
                    {categories.map(cat => (
                        <MenuItem key={cat.categoria} value={cat.categoria}>{cat.categoria}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid container spacing={4} justifyContent="center" borderRadius={2}>
                {filteredProducts.map(product => (
                    <Grid item key={product.id_producto} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', 
                                    display:'flex', 
                                    flexDirection:'column', 
                                    borderRadius:4, 
                                    backgroundImage:`linear-gradient(rgba(255, 255, 255, 0.175), rgba(255, 255, 255, 0.05)),url(${backgroundImage})`,
                                    backgroundSize:'cover',
                                    backgroundPosition:'center',
                                    boxShadow: '0 4px 20px rgba(89, 19, 178, 0.5)', 
                                    transition: 'transform 0.3s, box-shadow 0.3s', 
                                    '&:hover': {
                                    transform: 'scale(1.05)', 
                                    boxShadow: '0 8px 40px rgba(89, 19, 178, 0.8)'
                                    }
                                    }}>
                            <CardMedia
                                component="img"
                                alt={product.nombre}
                                height="300"
                                image={`http://192.168.1.7:5000${product.image_path}`}
                                title={product.nombre}
                            />
                            <CardContent sx={{flexGrow:1, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                <Typography variant="h5" component="div" color={'white'} fontSize={16} fontFamily={'monospace'}>
                                    {product.nombre}
                                </Typography>
                                <Typography variant="body2" color="white" fontWeight={'bold'} fontSize={20} fontFamily={'monospace'}>
                                    S/.{product.precio} 
                                </Typography>
                                <Box sx={{ display:'flex', justifyContent:'space-between',mt:2 }} >
                                <Button
                                    component= {Link}
                                    to={`/products/${product.id_producto}`}
                                    sx={{mr:1, borderRadius:2, color:'white',backgroundColor:'#1E90FF' ,fontWeight:'bold','&:hover':{backgroundColor:'#1E88E5'}}}
                                >
                                    Detalles
                                </Button>
                                <Button
                                    onClick={() => handleAddToCart(product.id_producto)}
                                    sx={{ borderRadius:2, color:'white', backgroundColor:'#00A36C',boxShadow:0, fontWeight:'bold','&:hover':{backgroundColor:'#1E88E5'}}}
                                >
                                    Añadir al carrito
                                </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
