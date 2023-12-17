const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // อ้างอิงไปยังโมเดลผู้ใช้
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
