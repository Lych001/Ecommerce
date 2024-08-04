const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const {checkAnyRole } = require('../middlewares/roleMiddleware');

router.get('/products', checkAnyRole(), productController.getAllProducts);
router.get('/products/:id', checkAnyRole() ,productController.getProductById)
router.get('/best-products', checkAnyRole(), productController.getBestProducts);
router.get('/recent-products', checkAnyRole(), productController.getRecentProducts);
router.get('/categories', checkAnyRole(), productController.getCategories);

module.exports = router;