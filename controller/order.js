const Order = require('../models/orders');


 const getorders = async (req, res)=>{
    try{
        let page = req.params.page || 1;
        let Items_Per_Page =Number(req.params.selectedValue || 3);

        const ordersall = await Order.findAll({where:{userId:req.user.id}})
        const orders = await Order.findAll({ offset:(page-1)*Items_Per_Page, limit:Items_Per_Page},{where:{userId:req.user.id}})
        const totalitems = ordersall.length
        // return res.status(200).json({orders, success: true})
        return res.status(200).json({orders,
            info: {
                currentPage: page,
                hasNextPage: totalitems > page * Items_Per_Page,
                hasPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                lastPage: Math.ceil(totalitems / Items_Per_Page)
            },
             success: true })
    }catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getorders
}