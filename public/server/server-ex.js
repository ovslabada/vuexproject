const path = require('path');
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser') 

const app = express() 
const port = 3000   

app.use(express.static('./dist')); 

const jsonParser = bodyParser.json() 

app.get('/api/good', (req, res) => { 
  fs.readFile('./server/data/catalog.json', 'utf8', (err, data) => { 
    res.send(data);
  })
})

app.get('/api/goodc', (req, res) => {
  fs.readFile('./server/data/cart.json', 'utf8', (err, data) => { 
    res.send(data);
  });
}) 

/* app.put('/api/tocart', (req, res) => {
  fs.readFile('./server/data/cart.json', 'utf8', (err, data) => { 
    const cart = JSON.parse(data);
    const newgoodincart = req.body;
    let index;
    index = cart.findIndex((item) => item.product_id == newgoodincart.product_id);
    if (index != -1) {
      cart[index].in_cart++;
      cart[index].quantity--;
    } else {
      const goodToCart = Object.assign({}, newgoodincart);
      goodToCart.in_cart = 1;
      goodToCart.quantity--;
      cart.push(goodToCart);
    }
    fs.writeFile('./server/data/cart.json', JSON.stringify(cart, null, '\t'),
    () => {
      res.end();
    })  
  })
})  */

app.put('/api/tocart', (req, res) => {
  fs.readFile('./server/data/cart.json', 'utf8', (err, data) => { 
    const cart = JSON.parse(data);
    const newgoodincart = req.body;
    const goodInCart = cart.find((good) => good.product_id == newgoodincart.product_id)
    if (goodInCart) {
      goodInCart.in_cart++;
      goodInCart.quantity--;
    } else {
      newgoodincart.in_cart = 1;
      newgoodincart.quantity--;
      cart.push(newgoodincart);
    }
    fs.writeFile('./server/data/cart.json', JSON.stringify(cart, null, '\t'),
    () => {
      res.end();
    })  
  })
}) 

app.put('/api/tocatalog', (req, res) => {
  fs.readFile('./server/data/catalog.json', 'utf8', (err, data) => { 
    const catalog = JSON.parse(data);
    const updategood = req.body;
    let findex;
    findex = catalog.findIndex((item) => item.product_id == updategood.product_id);
    catalog[index].quantity--;
    fs.writeFile('./server/data/cart.catalog', JSON.stringify(cart, null, '\t'),
    () => {
      res.end();
    })  
  })
}) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
