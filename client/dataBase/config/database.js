const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('e-commerce', 'root', 'root',{
    host: 'localhost',
     dialect: 'mysql'
});


sequelize.authenticate()
.then(()=>{
    console.log('Connection database');
}).catch((err)=>{
    throw err
})


const db={}

db.Car=require('../model/car.model')(sequelize,DataTypes);

// sequelize.sync({force:false})
// .then(()=>{
//     console.log('Tables created');
// }).catch((err)=>{
//     throw err
// })

module.exports=db