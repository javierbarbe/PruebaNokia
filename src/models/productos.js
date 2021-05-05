'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    
    static associate(models) {
      // define association here
      productos.belongsTo(models.hubs, {
                    
                    onDelete:'cascade', foreignKey:'hubId', as:'hub'
                });
    }
  };
  productos.init({
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey:true},
    nombre: { type: DataTypes.STRING,  allowNull: false,},
    precio: { type: DataTypes.INTEGER, allowNull: false},
    cantidad: { type: DataTypes.INTEGER, allowNull: false},
    hubId:  { type: DataTypes.INTEGER, allowNull: false, primaryKey:true}
  }, {
    sequelize,
    modelName: 'productos',
  });
  return productos;
};