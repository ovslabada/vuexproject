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

app.put('/cart', jsonParser , (req, res) => {
  fs.readFile('./server/data/cart.json', 'utf8', (err, data) => {
    cart = JSON.parse(data);
    const newcart = req.body;
    fs.writeFile('./server/data/cart.json', JSON.stringify(newcart, null, '\t'),
    () => {
      res.end();
    })
  });
})

app.get('/cart', (req, res) => {
  fs.readFile('./server/data/cart.json', 'utf8', (err, data) => { 
    res.send(data);
  });
}) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
