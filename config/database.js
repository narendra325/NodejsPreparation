
const mongoose = require("mongoose")
const dotenv = require('dotenv');
dotenv.config();


const PASSWORD_DB = process.env.PASSWORD_DB;
const dbUrl =`mongodb+srv://narendrasingampalli2:${PASSWORD_DB}@cluster0.3ykjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async()=>{
    await  mongoose.connect(dbUrl)
}

module.exports=connectDB;