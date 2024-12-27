const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const User = require("./models/user");
const { error } = require("console");
const { deflate } = require("zlib");
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

app.post("/signup", async (req, res) => {

  const {name,age,lastName,emailid,address} = req.body;
  try{
    const user = new User(name,age,lastName,emailid,address)
  await user.save();
  res.send("user is added sucessfully");
  }
  catch (error){
    if(error.errors=== 'validationError'){
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
