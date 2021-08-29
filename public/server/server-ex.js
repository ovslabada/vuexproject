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

app.put('/catalog', jsonParser , (req, res) => {
  fs.readFile('./server/data/catalog.json', 'utf8', (err, data) => {
    catalog = JSON.parse(data);
    const newcatalog = req.body;
    fs.writeFile('./server/data/catalog.json', JSON.stringify(newcatalog, null, '\t'),
    () => {
      res.end();
    })
  });
})



/* app.put('/api/cart', jsonParser , (req, res) => {
  fs.readFile('./server/data/cart.json', 'utf8', (err, data) => {
    const cart = JSON.parse(data);
    const item = req.body
    cart.push(item);
    fs.writeFile('./server/data/cart.json', JSON.stringify(cart, null, '\t'),
    () => {
      res.end();
    })
  });
}) */

app.post('/api/cart', jsonParser , (req, res) => {
  fs.readFile('./server/data/cart.json', 'utf8', (err, data) => {
    const cart = JSON.parse(data);
    const item = req.body
    cart.push(item);
    fs.writeFile('./server/data/cart.json', JSON.stringify(cart, null, '\t'),
    () => {
      res.end();
    })
  });
})

app.put('/api/newcart', jsonParser , (req, res) => {
  fs.readFile('./server/data/cart.json', 'utf8', (err, data) => {
    fs.writeFile('./server/data/cart.json', JSON.stringify(req.body, null, '\t'),
    () => {
      res.end();
    })
  });
})

app.put('/api/addgood', jsonParser , (req, res) => {
  fs.readFile('./server/data/catalog.json', 'utf8', (err, data) => {
    let changecatalog = JSON.parse(data);
    let changegood = req.body;
    let index;
    index = changecatalog.findIndex((item) => item.product_id == changegood.product_id);
    changecatalog[index].quantity--;
    fs.writeFile('./server/data/catalog.json', JSON.stringify(changecatalog, null, '\t'),
    () => {
      res.end();
    })
  });
})

app.put('/api/delgood', jsonParser , (req, res) => {
  fs.readFile('./server/data/catalog.json', 'utf8', (err, data) => {
    let changecatalog = JSON.parse(data);
    let changegood = req.body;
    let index;
    index = changecatalog.findIndex((item) => item.product_id == changegood.product_id);
    changecatalog[index].quantity++;
    fs.writeFile('./server/data/catalog.json', JSON.stringify(changecatalog, null, '\t'),
    () => {
      res.end();
    })
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
