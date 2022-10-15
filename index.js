const express = require("express");
const bodyParser = require('body-parser');
const getExcel = require("./getExcel.js");


const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

app.post("/main", async (req, res) => {

  const sheet = req.body.name;

  const data = await getExcel("./src/engie_hackuiowa_data.xlsx", req.body.name);
  
  return res.send(data);


})

app.listen(port, () => {
  console.log(`connected to http://localhost:${port}`);
});
