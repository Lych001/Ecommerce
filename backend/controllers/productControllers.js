const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
    const user = req.user; 

    const callback = (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        const productsWithImageUrl = results.map(product => ({
            ...product,
            imageUrl: `http://192.168.1.7:5000${product.image_path}`
        }));
        res.json(productsWithImageUrl);
    };

    if (user && user.tipo_usuario === 'premium') {
        Product.getAllWithCustomPrices(user.id_usuario, callback);
    } else {
        Product.getAll(callback);
    }
};

exports.getProductById = (req, res) => {
    const productId = req.params.id;
    const userId = req.user ? req.user.id_usuario : null;

    const callback = (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener el producto' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const product = result[0];
        product.imageUrl = `http://192.168.1.7:5000${product.image_path}`;
        res.json(product);
    };

    if (userId) {
        Product.getByIdWithCustomPrice(productId, userId, callback);
    } else {
        Product.getById(productId, callback);
    }
};

exports.getBestProducts = (req, res) => {
    const callback = (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los productos destacados' });
    }
    const productsWithImageUrl = results.map(product => ({
        ...product,
        imageUrl: `http://192.168.1.7:5000${product.image_path}`
    }));
    res.json(productsWithImageUrl);
    };
    Product.getBestProducts(callback);
};

exports.getRecentProducts = (req, res) => {
    const callback = (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los productos recientes' });
        }
        const productsWithImageUrl = results.map(product => ({
            ...product,
            imageUrl: `http://192.168.1.7:5000${product.image_path}`
        }));
        res.json(productsWithImageUrl);
    }
    Product.getRecentProducts(callback);
};

exports.getCategories = (req, res) => {
    Product.getCategories((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las categorías' });
        }
        res.json(results);
    });
};