const { mongoose } = require("../configuration/dbConfig");


const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String,enum:["admin","customer"],default:"customer"},
    cart: [Object] 
})
const Userschemadb = mongoose.model("User",userSchema);
module.exports=Userschemadb;