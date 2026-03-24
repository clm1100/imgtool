const dealWater= require('./utils');


const express = require('express')
const app = express();

app.use(express.static('./assets'))
app.use(express.static('./'))

app.get('/water',async (req,res)=>{
    let {size,productname,producttype,productdate,productpeople} = req.query;
    console.log(size);
    dealWater[size]({ productname, producttype, productdate, productpeople }, res)
})


app.listen(3001,()=>{
    console.log("running http://localhost:3001")
})