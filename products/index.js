const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
let products = [];

app.get('/products/getProduct/:productId', (req,res) => {

    const productId = parseInt(req.params.productId);
    const product = products.find((product) => product.id === productId);

    if(!product){
        return res.status(404).json({error: "Product not found"});
    }

    try{
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: "There is an error"});
    }
})



app.post('/products/addProducts', (req, res) =>{

    const item = req.body;

    const product = {
        id: products.length,
        name: item.name,
        price: item.price
    }

    try{
        products.push(product);
        res.status(201).json(products);
    } catch (error){
        res.status(500).json({error: "There is an error"});
    }


})









app.listen(port, () => {
    console.log(`Product Server running at port ${port}`);
})