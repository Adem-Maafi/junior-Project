const express = require('express');
const Router = express.Router();
const {register,login,getUserCars}=require('../controller/user.controller')


Router.post('/register', register);
Router.post('/login', login);
Router.get('/cars',  getUserCars);



module.exports = Router;
