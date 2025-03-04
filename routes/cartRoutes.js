const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

// Xem giỏ hàng
router.get('/', async (req, res) => {
    let cart = req.session.cart || [];
    let fullCart = [];

    for (let item of cart) {
        let product = await Product.findById(item.productId);
        if (product) {
            fullCart.push({ product, quantity: item.quantity });
        }
    }

    res.render('cart', { cart: fullCart });
});

// Thêm sản phẩm vào giỏ hàng
router.get('/add/:id', async (req, res) => {
    let cart = req.session.cart || [];
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return res.status(404).send("Sản phẩm không tồn tại!");
    }

    let item = cart.find(item => item.productId === req.params.id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ productId: req.params.id, quantity: 1 });
    }

    req.session.cart = cart;
    res.redirect('/products');
});

// Xóa sản phẩm khỏi giỏ hàng
router.get('/remove/:id', (req, res) => {
    req.session.cart = req.session.cart.filter(item => item.productId !== req.params.id);
    res.redirect('/cart');
});

module.exports = router;
