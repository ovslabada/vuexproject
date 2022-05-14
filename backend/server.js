const path = require('path');
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')


const app = express()
const port = 3000

const addressesFile = './data/addresses.json'
const cartFile = './data/cart.json'
const catalogFile = './data/catalog.json'

app.use(express.static('./dist'));
app.use(bodyParser.json())

app.get('/api/good', (req, res) => {
  fs.readFile(catalogFile, 'utf8', (err, data) => {
    res.send(data);
  })
})

app.get('/api/goodc', (req, res) => {
  fs.readFile(cartFile, 'utf8', (err, data) => {
    res.send(data);
  });
})

app.put('/api/tocart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
  const cart = JSON.parse(fs.readFileSync(cartFile, 'utf8'));

  const newgoodincart = req.body;
  const goodInCatalog = catalog.find((good) => good.product_id == newgoodincart.product_id);

  if (goodInCatalog && goodInCatalog.quantity) {
    const goodInCart = cart.find((good) => good.product_id == newgoodincart.product_id);

    if (goodInCart) {
      goodInCart.in_cart++;
    } else {
      newgoodincart.in_cart = 1;
      cart.push({ product_id: newgoodincart.product_id, product_price: newgoodincart.product_price, in_cart: 1 });
    }
    goodInCatalog.quantity--;

    fs.writeFileSync(cartFile, JSON.stringify(cart, null, '\t'));
    fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, '\t'));

    res.send({ "status": "ok" });
  } else {
    res.send({ "status": "error" });
  }
})

app.put('/api/poptocart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
  let cart = JSON.parse(fs.readFileSync(cartFile, 'utf8'));

  const goodDel = req.body;
  const goodInCatalog = catalog.findIndex((good) => good.product_id == goodDel.product_id);
  const goodInCart = cart.findIndex((good) => good.product_id == goodDel.product_id);

  if ((goodInCatalog != -1) && (goodInCart != -1) && cart[goodInCart].in_cart) {
    catalog[goodInCatalog].quantity++;

    if (cart[goodInCart].in_cart > 1)
      cart[goodInCart].in_cart--;
    else
      cart.splice(goodInCart, 1);

    fs.writeFileSync(cartFile, JSON.stringify(cart, null, '\t'));
    fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, '\t'));

    res.send({ "status": "ok" });
  } else {
    res.send({ "status": "error" });
  }
})

app.put('/api/delfromcart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
  let cart = JSON.parse(fs.readFileSync(cartFile, 'utf8'));

  const goodDel = req.body;
  const goodInCatalog = catalog.findIndex((good) => good.product_id == goodDel.product_id);
  const goodInCart = cart.findIndex((good) => good.product_id == goodDel.product_id);

  if ((goodInCatalog != -1) && (goodInCart != -1) && cart[goodInCart].in_cart) {
    catalog[goodInCatalog].quantity += cart[goodInCart].in_cart;
    cart.splice(goodInCart, 1);

    fs.writeFileSync(cartFile, JSON.stringify(cart, null, '\t'));
    fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, '\t'));

    res.send({ "status": "ok" });
  } else {
    res.send({ "status": "error" });
  }
})

app.put('/api/resetcart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
  let cart = JSON.parse(fs.readFileSync(cartFile, 'utf8'));

  cart.forEach(cartItem => {
    const goodInCatalog = catalog.find((good) => good.product_id == cartItem.product_id);
    if (goodInCatalog) goodInCatalog.quantity += cartItem.in_cart;
  });

  cart = [];

  fs.writeFileSync(cartFile, JSON.stringify(cart, null, '\t'));
  fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, '\t'));

  res.send({ "status": "ok" });
})

app.post('/api/postaddress', (req, res) => {
  fs.readFile(addressesFile, 'utf8', (err, data) => {
    const addresses = JSON.parse(data);
    
    let cart = JSON.parse(fs.readFileSync(cartFile, 'utf8'));
    cart = [];
    fs.writeFileSync(cartFile, JSON.stringify(cart, null, '\t'));

    const newaddress = req.body;
    addresses.push(newaddress);
    fs.writeFile(addressesFile, JSON.stringify(addresses, null, '\t'), (err) => {
      res.send({ "status": "ok" });
    });
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
