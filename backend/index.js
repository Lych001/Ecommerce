const express = require('express'); 
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', productRoutes);
app.use('/auth', authRoutes);
app.use('/api' , cartRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running on port ${PORT}`);
});
