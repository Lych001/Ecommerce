import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Typography } from '@mui/material';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [userType, setUserType] = useState('');

        const fetchCartItems = async () => {
            const token = localStorage.getItem('token'); 
            const userType = localStorage.getItem('tipo_usuario'); 
            setUserType(userType); 
            try {
                const response = await axios.get('http://192.168.1.7:5000/api/cart', {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : ''
                    }
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el carrito', error);
                setError(error);
                setLoading(false);
            }
        };
        useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        const calculateTotal = () => {
            let newTotal = 0;
            cartItems.forEach(item => {
                newTotal += item.precio * item.cantidad;
            });
            setTotal(newTotal);
        };
        calculateTotal();
    }, [cartItems]);


    const handleQuantityChange = async (productId, newQuantity) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://192.168.1.7:5000/api/cart/${productId}`, {
                cantidad: newQuantity
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });
            fetchCartItems();

            
        } catch (error) {
            console.error('Error al actualizar la cantidad', error);
        }
    };

    const handleRemoveItem = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://192.168.1.7:5000/api/cart/${productId}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });
            setCartItems(prevItems => prevItems.filter(item => item.id_producto !== productId));
        } catch (error) {
            console.error('Error al eliminar el producto del carrito', error);
        }
    };

    if (loading) return <div>Cargando carrito...</div>;
    if (error) return <div>Error al cargar el carrito</div>;

    return (
        <Container>
            <TableContainer>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{fontWeight:'bold', color:'white', mr:1}}>Nombre</TableCell>
                            <TableCell sx={{fontWeight:'bold', color:'white'}}>Precio</TableCell>
                            <TableCell sx={{fontWeight:'bold', color:'white'}}>Cantidad</TableCell>
                            <TableCell sx={{fontWeight:'bold', color:'white'}}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {cartItems.map(item => (
                        <React.Fragment key={item.id_producto}>
                            <TableRow >
                                <TableCell sx={{fontWeight:'bold', color:'white',mr:1}}>{item.nombre}</TableCell>
                                <TableCell sx={{fontWeight:'bold', color:'white'}}>{item.precio}</TableCell>
                                <TableCell sx={{fontWeight:'bold', color:'white',mr:1}}>
                                    <TextField
                                        type="number"
                                        value={item.cantidad}
                                        onChange={(e) => handleQuantityChange(item.id_producto, parseInt(e.target.value))}
                                        sx={{backgroundColor:'white', borderRadius:3, width:75, border:'none'}}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.id_producto)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                            {item.cantidad >= 3 && userType.toLowerCase() === 'normal' && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{color:'white'}}>
                                        Se está aplicando el precio al por mayor, ¡disfruta!
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" align="right" style={{ marginTop: '20px', fontWeight:'bold',color:'white' }}>
                Total: S/.{total.toFixed(2)}
            </Typography>
        </Container>
    );
};

export default Cart;
