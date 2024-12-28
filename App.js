const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const User = require("./models/user");
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use((express.json()))

//Middleware
// app.use((err, req, res, next) => {
//   if (err.name === "ValidationError") {
//     for (const field in err.errors) {
//       console.error(
//         `validation error for ${field} : ${err.errors[field].message}`
//       );
//     }
//     res.status(400).send({ error: "validation error", details: err.errors });
//   }

//   console.error(`unexpected error : ${err.message}`);
//   res.status(500).send({ error: "internal server error" });
// });


app.get("/feed" , async(req,res)=>{
  try{
    const users = await User.find({})
    res.send(users);
  }
  catch(error){
    console.error("unexpected error")
  }

})

app.get("/user", async(req,res)=>{
  const userId = req.body.id;
  try{
    
    const user = await User.findOne(userId);
    res.send(user)
  }
  catch(error){
    console.log("unexpected error")
  }
})

app.post("/signup", async (req, res) => {

  const {name,age,lastName,emailid,address} = req.body;
  try{
    const user = new User({name,age,lastName,emailid,address})
  await user.save();
  res.send("user is added sucessfully");
  }
  catch (error){
    if(error.errors=== 'ValidationError'){
        for(const field in error.errors){
          console.error(`validation error for ${field} : ${error.errors[field].message}`)
        }
        res.status(400).send({error:"validation error", details:error.errors})

    }
    else{
      console.error(`unexpected error : ${error.message}`)
      res.status(500).send({error:"internal server error"})
    }
  }
  
});

app.delete("/user", async(req,res)=>{
  const userid = req.body.id;
  try{
    const user = await User.findByIdAndDelete(userid);
   res.send("user deleted sucesfully")
  }
  catch(error){
    console.error("unexpected error")
  }
})

app.patch("/user", async(req,res)=>{
  const userid = req.body.id;
  const data = req.body;
  try{
    console.log(data)

    const user = await User.findByIdAndUpdate(userid,data)
    console.log('User after update or creation:', user);
    res.send("user updated")
  }
  catch(error){
    console.log("unexpected error")
  }
})

connectDB()
  .then(() => {
    console.log("databasse is connected sucessfully");
    app.listen(PORT, () => {
      console.log(`Server is running successfully at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("database is not connecte", error);
  });
