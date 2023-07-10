const Product = require('../models/product');
const User = require('../models/users');
const Order = require('../models/orders')

const addproduct = async(req, res) => {
    // const t = await sequelize.transaction()
    try{ 
    const { productname, quantity, description, price } = req.body;

    if(productname == undefined || productname.length === 0 ){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }
    const product = await Product.create({ name : productname, quantity:quantity, description:description, price:price})
    //,{transaction:t})
    //     const totalExpense = Number(req.user.totalExpenses) + Number(expenseamount)
    //     console.log(totalExpense)
    //     await User.update({
    //         totalExpenses: totalExpense
    //     },{ 
    //         where:{id:req.user.id},
    //         transaction:t
    //     })
    //     await t.commit();// only after this data gets updated database
        return res.status(201).json({product, success: true} );
    }
    catch(err) {
        // await t.rollback() // this will not let update database as error occured
        return res.status(500).json({success : false, error: err})
      }
}

const getproducts = async(req, res)=> {
    try{
        let page = req.params.page || 1;
        // console.log('this is let req.params.page',req.params.page)
        let Items_Per_Page =Number(req.params.selectedValue || 3);
        console.log('this is let Items_Per_Page',req.params.selectedValue)
        const products2 = await Product.findAll()
        const products = await Product.findAll({ offset:(page-1)*Items_Per_Page, limit:Items_Per_Page})
        let totalitems = products2.length
        console.log('this is let totalitems',totalitems)

        return res.status(200).json({products,
            info: {
                currentPage: page,
                hasNextPage: totalitems > page * Items_Per_Page,
                hasPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                lastPage: Math.ceil(totalitems / Items_Per_Page)
            },
             success: true })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ error: err, success: false})
    }
}

const buyproduct = async (req, res) => {
    console.log('start')
    try{ 
        const prodid = req.body.productid
        const product = await Product.findOne({where :{id:prodid}})
        // console.log("thisssssssssssis producttttttttt",product,req.user)
        const order = await Order.findOne({where:{productid:prodid}})
        if(order){
            await Order.update({productqty:order.productqty+1,price:order.price + product.price},{where:{id:order.id}})
        }
        else{
            await req.user.createOrder({productid:product.id,productname:product.name,productqty:1,price:product.price})
        }
        await Product.update({quantity:product.quantity-1},{where:{id:prodid}})
        return res.status(200).json({ success: true, message: "ordered created Successfuly"})

    }catch (err) {
        console.log(err,"errrr from controller")
        return res.status(500).json({success : false, error: err})
    }
}

module.exports = {
    buyproduct,
    getproducts,
    addproduct
}