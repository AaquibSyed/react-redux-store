const express =require("express");
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const shortid= require('shortid');

//setup express to use body parser
const app=express();
app.use(bodyParser.json());

//create mongoDb Connection
mongoose.connect('mongodb://localhost/react-shopping-cart-db',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

//define model for product
const Product = mongoose.model('products',new mongoose.Schema(
    {
        _id:{type:String, default:shortid.generate()},
        image:String,
        title:String,
        description:String,
        price:Number, 
        availableSizes:[String]
    }
))

//create Endpoints to get and post 
app.get('/api/products',async(req,res)=>{
    const products = await Product.find({});//find() is a promise, so use aync await,get all products-object inside func is empty
    res.send(products);//send products as response to client
})

//create product API. and then send respose aftrer creating
app.post('/api/products',async(req,res)=>{
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})

//api to delete product
app.delete('/api/product/:id',async(req,res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct)
})

//define port
const port = process.env.PORT || 5000;

//listen at the above port for requests
app.listen(port,()=>{
console.log(`server started at http://localhost:${port}`)
})

