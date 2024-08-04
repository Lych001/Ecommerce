import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, Dialog, DialogContent } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import FormRegister from './FormRegister'; 

const FormLogin = ({ onSuccess }) => { 
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const [openRegister, setOpenRegister] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await login(formData);
    if (error) {
      setError(error);
    } else {
      if (onSuccess) onSuccess();
      window.location.href = '/';
    }
  };

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Iniciar sesión</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de usuario"
          name="nombre_usuario"
          value={formData.nombre_usuario}
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
        <Button type="submit" variant="contained" color="primary">
          Iniciar sesión
        </Button>
        <Typography variant="body1" gutterBottom>
          ¿No tienes una cuenta? <Button onClick={handleOpenRegister} color="primary">Regístrate</Button>
        </Typography>
      </form>

      <Dialog open={openRegister} onClose={handleCloseRegister} fullWidth maxWidth="sm">
        <DialogContent>
          <FormRegister onClose={handleCloseRegister} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default FormLogin;
