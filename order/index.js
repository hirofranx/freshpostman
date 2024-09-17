const express = require('express');
const app = express();
const port = 3003;
const axios = require('axios');


app.use(express.json());

let orders = [];



app.post('/order/makeOrder', async (req, res) => {
    
    const ids = req.body;
    console.log(ids);
    try {
        const customer = await axios.get(`http://localhost:3002/customers/getCustomer/${ids.customerId}`);
        console.log(customer.data);
        if(customer.status !== 200){
            return res.status(404).json({error: error});
        }

        const product = await axios.get(`http://localhost:3001/products/getProduct/${ids.productId}`);
        console.log(product.data);
        if(product.status !== 200){
            return res.status(404).json({error: "Product not found"});
        }

        const order = {
            customerData: customer.data,
            productData: product.data
        }

        orders.push(order);
        console.log(orders);
        res.status(201).json(orders);
    } catch (error) {
        res.status(500).json({error: error});
    }







})









app.listen(port, () => {
    console.log(`Orders Server running at port ${port}`);
})