const { mongoose } = require("../configuration/dbConfig");

const ImageSchema = new mongoose.Schema({
    title: String,
    description: String, // Add description field
    amount: Number, // Add amount field
    image: String,
});

const Image = mongoose.model('Images', ImageSchema);

module.exports=Image