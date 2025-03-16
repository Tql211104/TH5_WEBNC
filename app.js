const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const path = require('path');
const reactViews = require('express-react-views');

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
    serverSelectionTimeoutMS: 5000, // Giới hạn thời gian kết nối 
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err.message)); // Hiển thị lỗi
// ✅ Cấu hình view engine để sử dụng React
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jsx'); 
app.engine('jsx', reactViews.createEngine()); // Sử dụng express-react-views

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
    const serverUrl = `http://localhost:${PORT}`;
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔗 You can visit the server at: ${serverUrl}`);
});
