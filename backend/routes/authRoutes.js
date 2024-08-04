const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { checkRole, checkAnyRole } = require('../middlewares/roleMiddleware'); 

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/verify-token', authController.verifyToken);

router.get('/admin', checkRole('administrador'), (req, res) => {
    res.send('Panel de Administrador');
});

router.get('/premium', checkRole('premium'), (req, res) => {
    res.send('Usuario Premium');
});

router.get('/trabajador', checkRole('trabajador'), (req, res) => {
    res.send('Trabajador de Tienda Trending');
});

module.exports = router;
