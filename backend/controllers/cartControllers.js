const Cart = require('../models/cart');

exports.getCart = (req, res) => {
    const user = req.user;
    const userId = user.id_usuario;
    const userType = user.tipo_usuario;

    Cart.getCartByUserId(userId, userType, (err, cart) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener el carrito' });
        }
        res.json(cart);
    });
};

exports.addToCart = (req, res) => {
    const userId = req.user.id_usuario;
    const { productId, quantity } = req.body;

    Cart.addItem(userId, productId, quantity, (err, productExists, currentQuantity) => {
        if (err) {
            return res.status(500).json({ message: 'Error al añadir al carrito' });
        }
        if (productExists) {
            const newQuantity = currentQuantity + quantity;
            Cart.updateItemQuantity(userId, productId, newQuantity, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al actualizar la cantidad' });
                }
                res.json({ message: 'Cantidad actualizada' });
            });
        } else {
            res.json({ message: 'Producto añadido al carrito' });
        }
    });
};

exports.updateCartItem = (req, res) => {
    const userId = req.user.id_usuario;
    const productId = req.params.id;
    const { cantidad } = req.body;

    Cart.updateItemQuantity(userId, productId, cantidad, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar la cantidad' });
        }
        res.json({ message: 'Cantidad actualizada' });
    });
};

exports.removeCartItem = (req, res) => {
    const userId = req.user.id_usuario;
    const productId = req.params.id;

    Cart.removeItem(userId, productId, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
        }
        res.json({ message: 'Producto eliminado del carrito' });
    });
};
