const mongoose = require('mongoose');
const {Schema} = mongoose


const userSchema = new Schema({
    name : {type:String, required:[true,"Name is required"]},
    lastName : String,
    age : Number,
    emailid:String,
    address:String,
})

const User = new mongoose.model ('User',userSchema)

module.exports = User;