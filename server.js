const express = require("express");
require('dotenv').config();
const connectToDb = require('./config/db.js');
require('./routes/index.js');
const app = express();



const authRouter = require('./routes/authRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const customerRouter = require('./routes/customerRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');

app.use(express.json());


app.use('/auth',authRouter);
app.use('/api',productRouter);
app.use('/product',customerRouter);
app.use('/order',orderRouter);

const PORT = process.env.PORT || 3000;

connectToDb()
.then(()=>console.log('connected to DB!'))
.catch((err)=>console.log("DB error: ",err));

app.listen( PORT,()=>{
    console.log(`Server is listening at ${PORT}...`);
});