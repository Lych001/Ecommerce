import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import { useAuth } from '../context/AuthContext';

function ResponsiveAppBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    await logout();
    handleCloseNavMenu();
    navigate('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => {
    setLoginMessage('');
    setOpenLogin(false);
  };

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleCartClick = () => {
    if (!user) {
      setLoginMessage('Para acceder al carrito debes iniciar sesión.');
      setOpenLogin(true);
    } else {
      navigate('/cart');
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#0D1B2A' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                fontFamily:'Montserrat, sans-serif',
                textShadow: '2px 2px 2px #1E88E5',
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TIENDA TRENDING
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {!user ? (
                  [
                    <MenuItem key="home" onClick={handleCloseNavMenu}>
                      <Button component={Link} to='/' color="inherit">Home</Button>
                    </MenuItem>,
                    <MenuItem key="home" onClick={handleCloseNavMenu}>
                    <Button component={Link} to='/products' color="inherit">Productos</Button>
                    </MenuItem>,
                    <MenuItem key="cart" onClick={() => { handleCloseNavMenu(); handleCartClick(); }}>
                    <Button color="inherit">Carrito</Button>
                    </MenuItem>,
                    <MenuItem key="login" onClick={() => { handleCloseNavMenu(); handleOpenLogin(); }}>
                      <Button color="inherit">Iniciar Sesión</Button>
                    </MenuItem>,
                    <MenuItem key="register" onClick={() => { handleCloseNavMenu(); handleOpenRegister(); }}>
                      <Button color="inherit">Registrarse</Button>
                    </MenuItem>,
                  ]
                ) : (
                  <>
                    <MenuItem key="home" onClick={handleCloseNavMenu}>
                      <Button component={Link} to='/' color="inherit">Home</Button>
                    </MenuItem>
                    <MenuItem key="home" onClick={handleCloseNavMenu}>
                      <Button component={Link} to='/products' color="inherit">Productos</Button>
                    </MenuItem>
                    <MenuItem key="cart" onClick={() => { handleCloseNavMenu(); handleCartClick(); }}>
                      <Button color="inherit">Carrito</Button>
                    </MenuItem>
                    <MenuItem key="logout" onClick={handleLogout}>
                      <Button color="inherit">Cerrar Sesión</Button>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 900,
                letterSpacing: '.15rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Tienda Trending
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'space-between', alignItems: 'center' }}>
              {!user ? (
                [
                  <Button key="home" component={Link} to='/' sx={{ my: 1, color: '#C4C4C4', fontWeight:'bold',  '&:hover': { borderBottom:'2px solid #ECEEF0', color:'#ECEEF0' } }}>
                    Home
                  </Button>,
                  <Button key="inicio" component={Link} to='/products' sx={{ my: 1, color: '#C4C4C4', fontWeight:'bold',  '&:hover': { borderBottom:'2px solid #ECEEF0', color:'#ECEEF0' } }}>
                    Productos
                  </Button>,
                  <Box sx={{display:'flex', gap:2}}>
                  <Button key="login" onClick={handleOpenLogin} sx={{ my:1, color: '#C4C4C4', borderBottom:'1px solid black',fontWeight:'bold' ,'&:hover': { borderBottom:'2px solid #ECEEF0', color:'#ECEEF0' } }}>
                    Iniciar Sesión
                  </Button>
                  <Button key="register" onClick={handleOpenRegister} sx={{ my: 1, color: '#DFE8EE',fontWeight:'bold', bgcolor:'#1E88E5', '&:hover': { borderBottom: '2px solid blue', borderColor:'white' } }}>
                    Registrarse
                  </Button>
                  <IconButton key="cart" onClick={handleCartClick} sx={{ my:1, color: '#1E88E5', fontWeight:'600', border:'2px solid #1E88E5' ,'&:hover': {borderColor:'white', color:'white' } }}>
                    <ShoppingCartIcon />
                  </IconButton>
                </Box>
                ]
              ) : (
                <>
                  <Button key="home" component={Link} to='/' sx={{ my: 1, color: '#C4C4C4', fontWeight:'bold',  '&:hover': { borderBottom:'2px solid #ECEEF0', color:'#ECEEF0' } }}>
                    Home
                  </Button>
                  <Button key="inicio" component={Link} to='/products' sx={{ my: 1, color: '#C4C4C4', fontWeight:'bold',  '&:hover': { borderBottom:'2px solid #ECEEF0', color:'#ECEEF0' } }}>
                    Productos
                  </Button>
                  <Box sx={{display:'flex', gap:2}}>
                  <Button key="logout" onClick={handleLogout} sx={{ color: '#C4C4C4', borderBottom:'1px solid black',fontWeight:'bold' ,'&:hover': { borderBottom:'2px solid #ECEEF0', color:'#ECEEF0' } }}>
                    Cerrar Sesión
                  </Button>
                  <IconButton key="cart" onClick={handleCartClick} sx={{ mr:2, color: '#1E88E5', fontWeight:'600', border:'2px solid #1E88E5' ,'&:hover': {borderColor:'white', color:'white' } }}>
                    <ShoppingCartIcon />
                  </IconButton>
                  </Box>
                </>
              )}
            </Box>
            {user && (
              <Typography variant="h6"sx={{color:'white', fontWeight:'bold', fontSize:16, borderBottom:'1px solid #1E88E5'}} >
                {user.nombre_usuario} 
              </Typography>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog open={openLogin} onClose={handleCloseLogin} maxWidth="sm" fullWidth>
        <DialogContent>
          {loginMessage && <Typography color="error">{loginMessage}</Typography>}
          <FormLogin onSuccess={handleCloseLogin} />
        </DialogContent>
      </Dialog>

      <Dialog open={openRegister} onClose={handleCloseRegister} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormRegister onClose={handleCloseRegister} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ResponsiveAppBar;
