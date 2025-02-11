const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./model/Product');
const methodOverride = require('method-override');


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
app.use(methodOverride('_method'));


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
app.get('/products/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id);
    res.render('show',{product});
})

//task 5 -> see the form of a particular product
app.get('/products/:id/edit',async(req,res)=>{
    const product = await Product.findById(req.params.id);
    res.render('edit',{product});
})

// task-6 -> update the product 
app.patch('/products/:id',async(req,res)=>{
    const{name,price,description} = req.body;
    await Product.findByIdAndUpdate(req.params.id ,{name , price, description});
    res.redirect('/products');
})


//Delete the product
app.delete('/products/:id',async(req,res)=>{
 await Product.findByIdAndDelete(req.params.id);
 res.redirect('/products');
})

let PORT = 8000;
app.listen(PORT,()=>{
    console.log(`server is conntected on port ${PORT}`)
})




