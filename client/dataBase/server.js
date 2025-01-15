const express = require('express');
require('./config/database');
const cors = require('cors');
const app=express();
const CarRouter=require('./routes/car.routes');
const port=5000;


app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());

app.use(express.static(__dirname+"/../client/dataBase/public"));

app.use('/api/cars',CarRouter);

app.listen(port,()=>{
    console.log('Server on port', port);
});