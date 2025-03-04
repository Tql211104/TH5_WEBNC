const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// ✅ Middleware để đọc dữ liệu JSON từ request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cấu hình session
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// ✅ Kết nối MongoDB
mongoose.connect('mongodb+srv://lamquangtung2111:123@shopapp.fcurn.mongodb.net/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Giới hạn thời gian thử kết nối (5s)
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err.message)); // Hiển thị lỗi rõ hơn

// ✅ Cấu hình view engine
app.set('view engine', 'ejs');

// ✅ Static file
app.use(express.static("public"));

// ✅ Import routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// ✅ Trang chủ
app.get('/', (req, res) => {
    res.redirect('/products');
});

// ✅ Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

