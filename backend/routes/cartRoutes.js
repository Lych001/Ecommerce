const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');
const { checkAnyRole } = require('../middlewares/roleMiddleware');

router.get('/cart', checkAnyRole(), cartController.getCart);
router.post('/cart', checkAnyRole(), cartController.addToCart);
router.put('/cart/:id', checkAnyRole(), cartController.updateCartItem);
router.delete('/cart/:id', checkAnyRole(), cartController.removeCartItem);

module.exports = router;
