const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');


app.use(cors())
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`)
})

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to DB");
})
.catch((e)=>{
    console.log(e.message);
})