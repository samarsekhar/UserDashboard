const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNumber: String,
    designation:String,
    gender:String,
    course: String,
    imgUpload: String
});

module.exports = mongoose.model("employees", productSchema);