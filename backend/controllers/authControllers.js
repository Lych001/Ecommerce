const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.register = async (req, res) => {
    const { nombre_usuario, email, contraseña, dni_o_ruc, nombres, apellidos, telefono } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        await User.create(nombre_usuario, email, hashedPassword, dni_o_ruc, nombres, apellidos, telefono);
        res.status(201).send('Usuario registrado');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
};

exports.login = async (req, res) => {
    const { nombre_usuario, contraseña } = req.body;
    try {
        const user = await User.findByUsername(nombre_usuario);
        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = jwt.sign({ sub: user.id_usuario, tipo_usuario: user.tipo_usuario }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

exports.logout = (req, res) => {

    res.send('Se ha cerrado la sesión con éxito');
};

exports.verifyToken = (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ valid: false, message: 'Token missing' });
    }

    jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false, message: 'Token invalid' });
        }


        const user = await User.findById(decoded.sub); 
        if (user) {
            res.json({ valid: true, user });
        } else {
            res.status(401).json({ valid: false, message: 'User not found' });
        }
    });
};

