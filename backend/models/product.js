const connection = require('../config/database');

class Product {
    static getAll(callback) {
        connection.query('SELECT id_producto, nombre,descripcion, precio_general AS precio, categoria, image_path, destacado FROM productos', callback);
    }
    static getAllWithCustomPrices(userId, callback) {
        const query ='SELECT p.id_producto, p.nombre, p.descripcion, p.categoria, COALESCE(pp.precio_personalizado, p.precio_general) AS precio, p.image_path FROM productos p LEFT JOIN precios_personalizados pp ON p.id_producto = pp.id_producto AND pp.id_usuario_premium = ? AND pp.activo = 1 WHERE p.habilitado = 1';
        connection.query(query, [userId], callback);
    }
    static getById(productId, callback) {
        const query= 'SELECT id_producto, nombre, descripcion, precio_general AS precio, image_path FROM productos WHERE id_producto = ?';
        connection.query(query, [productId], callback);
    }
    static getByIdWithCustomPrice(productId, userId, callback) {
        const query = 'SELECT p.id_producto, p.nombre, p.descripcion, p.categoria, COALESCE(pp.precio_personalizado, p.precio_general) AS precio, p.image_path FROM productos p LEFT JOIN precios_personalizados pp ON p.id_producto = pp.id_producto AND pp.id_usuario_premium = ? AND pp.activo = 1 WHERE p.habilitado = 1 AND p.id_producto = ?';
        connection.query(query, [userId, productId], callback);
    }
    static getBestProducts(callback) {
        connection.query('SELECT id_producto, nombre, precio_general AS precio, image_path FROM productos WHERE destacado = 1', callback);
    }
    static getRecentProducts(callback) {
        const query= 'SELECT id_producto, nombre, descripcion, precio_general AS precio, image_path, fecha_agregado FROM productos WHERE fecha_agregado >= NOW() - INTERVAL 7 DAY';
        connection.query(query, callback);
    }
    static getCategories(callback) {
        const query = 'SELECT DISTINCT categoria FROM productos WHERE categoria IS NOT NULL';
        connection.query(query, callback);
    }
}

module.exports = Product;
