const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./model/Product');


//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/product')
.then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log("error", err);
})

//set template
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

//using middleware for my post request
app.use(express.urlencoded({extended:true}));


//task 1 ->to display all the products
app.get('/products',async(req,res)=>{
    const products = await Product.find({});
    res.render('index',{products})
})

//task 2 -> create a new page to send a data
app.get('/products/new',(req,res)=>{
    res.render('new');
})

//task3-> add a product to the database.
app.post('/products',async(req,res)=>{
    const{ name, image,price,description} =req.body;
    const newProduct = new Product({name,image,price,description});
    await newProduct.save();
    res.redirect('/products');
})

//task 4 -> show a particular prdouct
app.get('/products/:id',(req,res)=>{
    const product = Product.findById(req.params.id);
    res.render('show',{product});
})


let PORT = 8080;
app.listen(PORT,()=>{
    console.log(`server is conntected on port ${PORT}`)
})




