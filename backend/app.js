const express = require('express');
const cors = require('cors');
const { json } = require('express');
const app = express();
const port = 5000;

let cost = [];
let items = [
    {
        id:0,
        name:'Candyfloss',
        description : 'Sweet and tasty sugar',
        price: 3.00,
        stock: 50,
        currency: 'GBP'
    },
    {
        id:1,
        name:'Fudge',
        description: 'Creamy fudge',
        price: 1.50,
        stock: 40,
        currency: 'GBP'
    },
    {
        id:2,
        name: 'Caramel',
        description: 'Gooey and Chewy',
        price: 2.99,
        stock: 90,
        currency: 'GBP'
    },
    {
        id:3,
        name: 'Chocolate Bar',
        description: 'Very tasty' ,
        price: 1.00,
        stock: 27,
        currency: 'GBP'
    },
    {
        id:4,
        name:'Chocolate Coins',
        description: 'Yummy',
        price: 2.00,
        stock: 32,
        currency: 'GBP'
    },
    {
        id:5,
        name: 'Praline',
        description: 'Nutty goodness',
        price: 1.50,
        stock: 54,
        currency: 'GBP'
    },
];
let new_stock = '';
let products = [];
let stock =  [];
let sum = '';
let total_cost = '';
let total_stock = '';

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || [
            'http://localhost:5174'
        ].includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(origin, 'Not allowed by CORS.'));
    }
  }));

app.get('/items', (req, res) => {
    res.send(items)
});
    
app.get(`/add/:item_name`, (req, res) => {
    products = items
    let item_name = req.params.item_name;
    for (let i=0; i < products.length; i++){
        if (products[i].name === item_name) {
            products[i].stock ++;
            new_stock = products[i].stock};
    }  
    stock = products.map((i)=>{
        return i.stock;
    });
    cost = products.map((i)=>{
        return i.price;
    });
    sum = stock.map((num,i) => {
        return num * cost[i];
    });
    total_cost = sum.reduce((a, b) => a + b);
    res.json({total_cost:total_cost, new_stock})
});

app.get(`/subtract/:item_name`, (req, res) => {
    products = items;
    let item_name = req.params.item_name;
    for (let i=0; i < products.length; i++){
        if (products[i].name === item_name){
            products[i].stock --;
            new_stock = products[i].stock};
    } 
    stock = products.map((i)=>{
        return i.stock;
    });
    cost = products.map((i)=>{
        return i.price;
    });
    sum = stock.map((num,i) => {
        return num * cost[i];
    });
    total_cost = sum.reduce((a, b) => a + b);
    res.json({total_cost:total_cost, new_stock});
});
  

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });