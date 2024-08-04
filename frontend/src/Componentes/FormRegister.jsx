import React, { useState } from 'react';
import { TextField, Button, Container, DialogContent, Dialog, Typography, Alert } from '@mui/material';
import axios from 'axios';
import FormLogin from './FormLogin';

const FormRegister = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    email: '',
    contraseña: '',
    dni_o_ruc: '',
    nombres: '',
    apellidos: '',
    telefono: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openLogin, setOpenLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.7:5000/auth/register', formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false); 
        if (onClose) onClose(); 
        setOpenLogin(true); 
      }, 2000);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Error al registrar usuario. Inténtalo de nuevo.');
    }
  };

  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registro
      </Typography>
      {success ? (
        <Alert severity="success">¡Ya puedes iniciar sesión!</Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Nombre de usuario"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contraseña"
            name="contraseña"
            type="password"
            value={formData.contraseña}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="DNI o RUC"
            name="dni_o_ruc"
            value={formData.dni_o_ruc}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Registrar
          </Button>
          <Typography variant="body1" gutterBottom>
            ¿Ya tienes una cuenta? <Button onClick={() => setOpenLogin(true)} color="primary">Iniciar Sesión</Button>
          </Typography>
        </form>
      )}
      <Dialog open={openLogin} onClose={handleCloseLogin} fullWidth maxWidth="sm">
        <DialogContent>
          <FormLogin onSuccess={handleCloseLogin} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default FormRegister;
