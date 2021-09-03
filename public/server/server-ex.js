const path = require('path');
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(express.static('./dist'));
app.use(bodyParser.json())

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

app.put('/api/tocart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync('./server/data/catalog.json', 'utf8'));
  const cart = JSON.parse(fs.readFileSync('./server/data/cart.json', 'utf8'));

  const newgoodincart = req.body;
  const goodInCatalog = catalog.find((good) => good.product_id == newgoodincart.product_id);

  if (goodInCatalog && goodInCatalog.quantity) {
    const goodInCart = cart.find((good) => good.product_id == newgoodincart.product_id);

    if (goodInCart) {
      goodInCart.in_cart++;
    } else {
      newgoodincart.in_cart = 1;
      cart.push(newgoodincart); // Bad, wery bad
      // cart.push({ product_id: newgoodincart.product_id, in_cart: 1 }); // Good
    }
    goodInCatalog.quantity--;

    fs.writeFileSync('./server/data/cart.json', JSON.stringify(cart, null, '\t'));
    fs.writeFileSync('./server/data/catalog.json', JSON.stringify(catalog, null, '\t'));

    res.send({"status": "ok"});
  } else {
    res.send({"status": "error"});
  }
})

app.put('/api/poptocart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync('./server/data/catalog.json', 'utf8'));
  const cart = JSON.parse(fs.readFileSync('./server/data/cart.json', 'utf8'));

  const gooddel = req.body;
  const goodInCatalog = catalog.find((good) => good.product_id == gooddel.product_id);
  goodInCatalog.quantity++;
  let index;
  index = cart.findIndex((item) => item.product_id == gooddel.product_id);
  if (cart[index].in_cart > 1) {
    cart[index].in_cart--
  } else {
    cart.splice([index], 1);
  }
    fs.writeFileSync('./server/data/cart.json', JSON.stringify(cart, null, '\t'));
    fs.writeFileSync('./server/data/catalog.json', JSON.stringify(catalog, null, '\t'));

    res.send({"status": "ok"});
})

app.put('/api/delfromcart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync('./server/data/catalog.json', 'utf8'));
  const cart = JSON.parse(fs.readFileSync('./server/data/cart.json', 'utf8'));
  const gooddel = req.body;
  let index;
  index = cart.findIndex((item) => item.product_id == gooddel.product_id);
  const quantity = cart[index].in_cart;
  cart.splice([index], 1);
  const goodInCatalog = catalog.find((good) => good.product_id == gooddel.product_id);
  goodInCatalog.quantity += quantity;

  fs.writeFileSync('./server/data/cart.json', JSON.stringify(cart, null, '\t'));
  fs.writeFileSync('./server/data/catalog.json', JSON.stringify(catalog, null, '\t'));

  res.send({"status": "ok"});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
