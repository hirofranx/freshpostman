const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

let customers = [];
let idCounter = 0;

app.get('/customers/getAll', (req, res) => {

    try{
        res.status(200).json(customers);
    } catch (error){
        res.status(500).json({message: "server error"});
    }

})






app.get('/customers/getCustomer/:customerId', (req,res) => {

    const customerId = parseInt(req.params.customerId);
    const customerData = customers.find((customer) => customer.id === customerId);
    
    if(!customerData){
        return res.status(404).json({error: "Customer not found"});
    }
    try{
        res.status(200).json(customerData);
    } catch (error) {
        res.status(500).json({error: "There is an error"});
    }
})


app.post('/customers/addCustomer', (req,res) => {
    
    const firstName = req.body.firstName;

    const customer = {
        id: idCounter++,
        firstName
    }

    try{
        customers.push(customer);
        res.status(201).json(customers);
    } catch (error){
        res.status(500).json({error: "There is an error"});
        console.log(error);
    }
})

app.delete('/customers/deleteCustomer/:customerId', (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const customerIndex = customers.findIndex((customer) => customer.id === customerId);
    console.log(customerId);
    try {
        customers.splice(customerIndex, 1);
        res.status(200).json({message: "Deleted Successfully"});
    } catch (error) {
        res.status(404).json({ error: "Customer not found" });
    }
})


app.put('/customers/updateCustomer/:customerId', (req, res) => {
    const customer = parseInt(req.params.customerId);
    const customerData = customers.find((customer) => customer.id === customerId);

    const newData = req.body;



})






app.listen(port, () => {
    console.log(`Customers Server running at port ${port}`);
})