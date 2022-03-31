//imports
const express = require("express");
const cors = require("cors")
const repoContext = require("./repository/repository-wrapper");
const productValidate = require("./middleware/product-validation");
const productLogger = require("./middleware/product-logger")
const app = express();


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Endpoints
// http://localhost:5005 (BASE URL)

// GET all products
// http://localhost:5005/api/products
app.get("/api/products", (req, res) => {
  const products = repoContext.products.findAllProducts();
  return res.send(products);
});

// GET product by id
// http://localhost:5005/api/products/:id
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = repoContext.products.findProductById(id);
  return res.send(product);
});

//POST new product
// http://locathost:5005/api/products
app.post("/api/products", [productLogger, productValidate], (req, res) => {
  const newProduct = req.body;
  const addedProduct = repoContext.products.createProduct(newProduct);
  return res.status(201).send(addedProduct);
});

//PUT an existing product
// http://localhost:5005/api/products/:id
app.put("/api/products/:id", [productValidate], (req, res) => {
  const id = parseInt(req.params.id);
  const productPropertiesToModify = req.body;
  const productToUpdate = repoContext.products.updateProduct(
    id,
    productPropertiesToModify
  );
  return res.send(productToUpdate);
});

//DELETE a product
// http://localhost:5005/api/products/:id
app.delete("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletedProduct = repoContext.products.deleteProduct(id);
    return res.send(deletedProduct);

})

// Starting a Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running, student! On PORT: ${PORT}`);
});
