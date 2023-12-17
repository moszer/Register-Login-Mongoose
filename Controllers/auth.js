const bcrypt = require('bcryptjs');
const User = require('../Models/User.js');
const jwt = require('jsonwebtoken');
const Product = require('../Models/Products.js')

//register
exports.register = async (req, res) => {
    try{
        //restructure var
        const {username, passwords} = req.body;
        //user checker
        var user = await User.findOne({ username })

        if(user){
            console.log("have a user!!")
            return res.send("You registed!!")
        } else {
            console.log("not have a user!!")
        }

        //encrypt
        const salt = await bcrypt.genSalt(10);

        user = new User({
            username: username,
            passwords: passwords
        })

        user.passwords = await bcrypt.hash(passwords, salt)
        await user.save()

        res.send("Register Success");

    }catch(err){
        console.log(err)
    }
}

//login
exports.login = async (req, res) => {
    try{
        const {username, passwords} = req.body;
        var user = await User.findOneAndUpdate({ username }, {new: true})
        if(user){
            console.log('have a user!!!')
            const isMatch = await bcrypt.compare(passwords, user.passwords)
            if(!isMatch){
                return res.send("pass is not correct!!!")
            } else {
                var payload = {
                    user: {
                        name: user.username
                    }
                }
                //generate token
                jwt.sign(payload, "mosnajaaa", {expiresIn: 999999}, (err, token) => {
                    if(err) throw err;
                    res.json({token,payload})
                })
            }


        } else {
            console.log('not have a user')
            return res.send("Not have a user!!!")
        }

    }catch(err){
        console.log(err)
    }
}

//add product
exports.products = async (req, res) => {
    try {
        //check user in db
        const user = await User.findOne({username: req.body.username});
        if(user === null){
            return res.status(500).json({ message: 'dont have user in database' });
        }

        //if user in db // push product to db

        const { productId, productName, quantity, price } = req.body;

        const product = new Product({
            productId,
            productName,
            quantity,
            price,
            username: user._id, // Use the _id of the user as a reference
        });

        await product.save();


        console.log(user)
        res.send(product)

      } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลสินค้า' });
      }
};


//get product
exports.getproducts = async (req, res) => {
    try {
        //check user in db
        const user = await User.findOne({ username: req.body.username });
        if(user === null){
            return res.status(500).json({ message: 'Dont have user in database' });
        }

        const products = await Product.findOne({ username: user._id});

        res.status(200).json({ products });

      } catch (error) {
        res.status(500).json({ message: 'ERR GET ITEMS' });
      }
};