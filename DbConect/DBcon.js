const { default: mongoose } = require('mongoose');
mongoose.Promise = global.Promise;

function Dbconection(){

    mongoose.connect('mongodb+srv://admin:1234@cluster0.deqfg2k.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log("DbConnected"))
        .catch((err) => {
            console.log(err)
            console.log("DB not connect")
        })
        
}
module.exports = Dbconection;


