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
    const customer = customers.find((customer) => customer.id === customerId);
    
    if(!customer){
        return res.status(404).json({error: "Customer not found"});
    }
    try{
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({error: "There is an error"});
    }
})


app.post('/customers/customerAdd', (req,res) => {
    
    const firstName = req.body.firstName;

    const customer = {
        id: customers.length,
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








app.listen(port, () => {
  console.log(`Customers Server running at port ${port}`);
});
