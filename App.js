const express = require('express');
const dotenv = require('dotenv');

dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use((req,res, next)=>{
    console.log("first handler is logged")
    next()
},
(req,res,next)=>{
    console.log("second handler is logged")
    next()
},(req,res,next)=>{
  console.log("third handler is logged")
  res.send("king")
})



app.listen(PORT, () => {
  console.log(`Server is running successfully at port ${PORT}`);
});


