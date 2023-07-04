const Order = require('../models/orders');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')


function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

 const addorder = async (req, res)=>{
    try{
    const { productid } = req.body;
    if(isstringinvalid(productid)){
        return res.status(400).json({err: "Bad parameters . Something is missing"})
    }
    await Order.create({})
    }catch(err) {
        res.status(500).json(err);
    }

}

module.exports = {
    addorder
}