const connection = require('../config/database');

class Cart {
    static getCartByUserId(userId, userType, callback) {
        const query = `
            SELECT cp.id_producto, p.nombre, 
                   CASE 
                       WHEN ? = 'premium' THEN COALESCE(pp.precio_personalizado, p.precio_general)
                       WHEN cp.cantidad >= 3 THEN pm.precio_mayor
                       ELSE p.precio_general
                   END AS precio, 
                   cp.cantidad
            FROM carrito c
            JOIN carrito_productos cp ON c.id_carrito = cp.id_carrito
            JOIN productos p ON cp.id_producto = p.id_producto
            LEFT JOIN precios_personalizados pp ON p.id_producto = pp.id_producto AND pp.id_usuario_premium = c.id_usuario AND pp.activo = 1
            LEFT JOIN precios_mayores pm ON p.id_producto = pm.id_producto AND pm.activo = 1
            WHERE c.id_usuario = ?`;

        connection.query(query, [userType, userId], callback);
    }

    static addItem(userId, productId, quantity, callback) {
        const getCartQuery = `SELECT id_carrito FROM carrito WHERE id_usuario = ?`;
        connection.query(getCartQuery, [userId], (err, result) => {
            if (err) return callback(err);
            let cartId = result.length ? result[0].id_carrito : null;
    
            if (!cartId) {
                const createCartQuery = `INSERT INTO carrito (id_usuario) VALUES (?)`;
                connection.query(createCartQuery, [userId], (err, result) => {
                    if (err) return callback(err);
                    cartId = result.insertId;
                    addItemToCart(cartId);
                });
            } else {
                addItemToCart(cartId);
            }
        });
    
        function addItemToCart(cartId) {
            const queryCheck = `
                SELECT cantidad FROM carrito_productos WHERE id_carrito= ? AND id_producto = ?`;
            connection.query(queryCheck, [cartId, productId], (err, result) => {
                if (err) return callback(err);
                if (result.length > 0) {
                    callback(null, true, result[0].cantidad);
                } else {
                    const queryInsert = `
                        INSERT INTO carrito_productos (id_carrito, id_producto, cantidad) 
                        VALUES (?, ?, ?)`;
                    connection.query(queryInsert, [cartId, productId, quantity], (err) =>{
                        if(err) return callback(err);
                        callback(null, false, 0);
                    });
                }
            });
        }
    }

    static updateItemQuantity(userId, productId, quantity, callback) {
        const query = `
            UPDATE carrito_productos 
            SET cantidad = ?
            WHERE id_producto = ? AND id_carrito = (SELECT id_carrito FROM carrito WHERE id_usuario = ?)`;
        connection.query(query, [quantity, productId, userId], callback);
    }

    static removeItem(userId, productId, callback) {
        const query = `
            DELETE FROM carrito_productos 
            WHERE id_producto = ? AND id_carrito = (SELECT id_carrito FROM carrito WHERE id_usuario = ?)`;
        connection.query(query, [productId, userId], callback);
    }
}

module.exports = Cart;
