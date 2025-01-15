const express=require('express');
const Router=express.Router();
const {getAllCars,AddCar,FindOneCar,DeleteCar,UpdateCar}=require('../controller/car.controller');


Router.get('/',getAllCars);
Router.post('/add',AddCar);
Router.get('/:id',FindOneCar);
Router.delete('/:id',DeleteCar);
Router.put('/:id',UpdateCar);

module.exports=Router;