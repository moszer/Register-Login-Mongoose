const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());


const {register, login, products, getproducts} = require('./Controllers/auth.js');
const Dbconection = require('./DbConect/DBcon.js')
const { auth } = require('./midleware/auth.js')

Dbconection();


app.post('/register', register)
app.post('/login', login)
app.post('/products', auth, products)
app.post('/getproducts', auth, getproducts)


const ipAddress = '172.20.10.2'; // replace with your computer's local IP
app.listen(port, () => {
  console.log(`Server is running on http://${ipAddress}:${port}`);
});
