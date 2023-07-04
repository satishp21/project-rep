const Product = require('../models/product');
const User = require('../models/users');
// const FilesDownloaded = require('../models/filesdownloaded');
// const sequelize = require('../util/database');
// const UserServices = require('../services/userservices')
// const s3Services = require('../services/s3services')

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
        // const products2 = await Product.findAll({ where : { userId: req.user.id}})
        const products = await Product.findAll({ offset:(page-1)*Items_Per_Page, limit:Items_Per_Page})
        let totalitems = products.length
        console.log('this is let totalitems',totalitems)
        // console.log('expenses',expenses)

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

const deleteproduct = async (req, res) => {
    console.log('start')
    try{
        const productid = req.params.productid; //this is obtained from url of delete req
        await Product.destroy({where : {id : productid}})
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})

    // // const productobj  = await Product.findOne ({where : {id : productid}})
    // // console.log(productobj[0].expenseamount,productobj[0].userId)
    // const user= await User.findOne({where : {id : expenseobj.userId }})
    // console.log(user)

    // if(expenseid == undefined || expenseid.length === 0){
    //     return res.status(400).json({success: false, })
    // }
    // const totalExpense = Number(user[0].totalExpenses) - Number(expenseobj[0].expenseamount)
    // console.log(totalExpense)
    // await User.update({
    //     totalExpenses: totalExpense
    // },{ 
    //     where:{id:req.user.id},
    //     // transaction:t
    // })
    // const noofrows = await Expense.destroy({where: { id: expenseid, userId: req.user.id }})
    //     if(noofrows === 0){
    //         return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
    //     }

    }catch (err) {
        console.log(err)
        return res.status(500).json({success : false, error: err})
    }
}


module.exports = {
    deleteproduct,
    getproducts,
    addproduct
}