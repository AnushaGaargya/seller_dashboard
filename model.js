const Sequelize = require('sequelize');
const sequelize = require('/Users/anusha/Desktop/Sharpener/nodejs_test_project/database.js');

const Item = sequelize.define('item',{
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    prod_name: Sequelize.STRING,
    price:{
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    stock:{
      type: Sequelize.INTEGER,
      allowNull: false
    }
    
  });
  
module.exports = Item;