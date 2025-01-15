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
db.User=require('../model/user.model')(sequelize,DataTypes);


db.User.hasMany(db.Car)
db.Car.belongsTo(db.User)

// sequelize.sync({alter:false})
// .then(()=>{
//     console.log('Tables created');
// }).catch((err)=>{
//     throw err
// })

module.exports=db