const express = require('express');
require('./config/database');
const cors = require('cors');
const app=express();
const CarRouter=require('./routes/car.routes');
const UserModel = require('./routes/user.routes');
const port=5000;

const corsOptions = {
    origin: 'http://localhost:3001', 
    credentials: true, 
  };
  
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(__dirname+"/../client/dataBase/public"));

app.use('/api/cars',CarRouter);
app.use('/api/users',UserModel)

app.listen(port,()=>{
    console.log('Server on port', port);
});