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
      // cart.push(newgoodincart); // Bad, wery bad
      cart.push({ product_id: newgoodincart.product_id, in_cart: 1 }); // Good
    }
    goodInCatalog.quantity--;

    fs.writeFileSync('./server/data/cart.json', JSON.stringify(cart, null, '\t'));
    fs.writeFileSync('./server/data/catalog.json', JSON.stringify(catalog, null, '\t'));

    res.send({ "status": "ok" });
  } else {
    res.send({ "status": "error" });
  }
})

app.put('/api/poptocart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync('./server/data/catalog.json', 'utf8'));
  let cart = JSON.parse(fs.readFileSync('./server/data/cart.json', 'utf8'));

  const goodDel = req.body;
  const goodInCatalog = catalog.findIndex((good) => good.product_id == goodDel.product_id);
  const goodInCart = cart.findIndex((good) => good.product_id == goodDel.product_id);

  if ((goodInCatalog != -1) && (goodInCart != -1) && cart[goodInCart].in_cart) {
    catalog[goodInCatalog].quantity++;

    if (cart[goodInCart].in_cart > 1)
      cart[goodInCart].in_cart--;
    else
      cart.splice(goodInCart, 1);

    fs.writeFileSync('./server/data/cart.json', JSON.stringify(cart, null, '\t'));
    fs.writeFileSync('./server/data/catalog.json', JSON.stringify(catalog, null, '\t'));

    res.send({ "status": "ok" });
  } else {
    res.send({ "status": "error" });
  }
})

app.put('/api/delfromcart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync('./server/data/catalog.json', 'utf8'));
  let cart = JSON.parse(fs.readFileSync('./server/data/cart.json', 'utf8'));

  const goodDel = req.body;
  const goodInCatalog = catalog.findIndex((good) => good.product_id == goodDel.product_id);
  const goodInCart = cart.findIndex((good) => good.product_id == goodDel.product_id);

  if ((goodInCatalog != -1) && (goodInCart != -1) && cart[goodInCart].in_cart) {
    catalog[goodInCatalog].quantity += cart[goodInCart].in_cart;
    cart.splice(goodInCart, 1);

    fs.writeFileSync('./server/data/cart.json', JSON.stringify(cart, null, '\t'));
    fs.writeFileSync('./server/data/catalog.json', JSON.stringify(catalog, null, '\t'));

    res.send({ "status": "ok" });
  } else {
    res.send({ "status": "error" });
  }
})

app.put('/api/resetcart', (req, res) => {
  const catalog = JSON.parse(fs.readFileSync('./server/data/catalog.json', 'utf8'));
  let cart = JSON.parse(fs.readFileSync('./server/data/cart.json', 'utf8'));

  cart.forEach(cartItem => {
    const goodInCatalog = catalog.find((good) => good.product_id == cartItem.product_id);
    if (goodInCatalog) goodInCatalog.quantity += cartItem.in_cart;
  });

  cart = [];
  
  fs.writeFileSync('./server/data/cart.json', JSON.stringify(cart, null, '\t'));
  fs.writeFileSync('./server/data/catalog.json', JSON.stringify(catalog, null, '\t'));
  
  res.send({ "status": "ok" });
})

app.post('/api/postaddress', (req, res) => {
  fs.readFile('./server/data/addresses.json', 'utf8', (err, data) => {
    const addresses = JSON.parse(data);
    const newaddress = req.body;
    addresses.push(newaddress);
    fs.writeFile('./server/data/addresses.json', JSON.stringify(addresses, null, '\t'), (err) => {
      res.send({ "status": "ok" });
    });
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
