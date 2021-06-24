// Define a schema
const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    middlename : {
        type:String,
        required:false
    },
    lastname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword : {
        type:String,
        required:true
    }
})

// Now we need to create a collection

const Register = new mongoose.model("Register", candidateSchema);

module.exports = Register;