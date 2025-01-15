module.exports = (sequelize, DataTypes) => {

const Car=sequelize.define('car',{

brand:{
    type:DataTypes.STRING,
    allowNull:true
},
model: {
    type: DataTypes.STRING,
    allowNull: true, 
},
year:{
    type:DataTypes.INTEGER,
    allowNull:true
},
price:{
    type:DataTypes.INTEGER,
    allowNull:true
},
description:{
    type:DataTypes.STRING,
    allowNull:true
},
image:{
    type:DataTypes.TEXT ,
    allowNull:true
}

},{
    timestamps:false
     


})

return Car



}