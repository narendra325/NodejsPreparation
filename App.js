const express = require("express");

const app = express();
const PORT = 7000;

app.use("/", (req, res) => {
  res.send("The king of good times");
});

app.listen(PORT, () => {
  console.log(`Server is running successfully at port ${PORT}`);
});
