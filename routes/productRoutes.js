const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

// Lấy chi tiết sản phẩm
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
});

// API Thêm sản phẩm (Dùng Postman)
router.post('/add', async (req, res) => {
    try {
        const { name, price, image, description } = req.body;
        const newProduct = new Product({ name, price, image, description });
        await newProduct.save();
        res.status(201).json({ message: "Thêm sản phẩm thành công!", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// API Xóa sản phẩm
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id.trim(); // Loại bỏ khoảng trắng nếu có
        console.log("ID nhận được:", id); // Debug kiểm tra ID

        // Kiểm tra nếu ID không hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: `ID sản phẩm không hợp lệ: ${id}` });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Sản phẩm không tồn tại!" });
        }

        res.status(200).json({ message: "Xóa sản phẩm thành công!", deletedProduct });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        res.status(500).json({ error: error.message });
    }
});




// API Cập nhật sản phẩm
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id.trim();
        console.log("ID nhận được:", id); // Debug ID

        // Kiểm tra nếu ID không hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: `ID sản phẩm không hợp lệ: ${id}` });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Sản phẩm không tồn tại!" });
        }

        res.status(200).json({ message: "Cập nhật sản phẩm thành công!", product: updatedProduct });
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
