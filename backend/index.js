require ("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let port = process.env.PORT;
console.log(port)
if(port == null || ""){
    port = 9000;
}

app.route("/").get(async (req, res)=>{
    return res.send("<h1>Hello World</h1>");
})

app.listen(port, ()=>{
    console.log("Server started at port: "+port);
})