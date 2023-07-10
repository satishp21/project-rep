const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = async(req, res, next) => {

  try {
    const token = req.header('Authorization')
    console.log(token)

    const user = jwt.verify(token,process.env.SEC_KEY)
    console.log(user.userId);

    const getUser = await User.findByPk(user.userId)
    req.user = getUser;
    next();
} 
catch(err) {
    console.log(err,"errrr from auth");
    return res.status(401).json({success: false})
    // err
  }

}

module.exports = {
    authenticate
}