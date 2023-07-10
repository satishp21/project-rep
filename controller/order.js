const Order = require('../models/orders');


 const getorders = async (req, res)=>{
    try{
        const orders = await Order.findAll({where:{userId:req.user.id}})
        console.log(orders)
        return res.status(200).json({orders, success: true})
    }catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getorders
}