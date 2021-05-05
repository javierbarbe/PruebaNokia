'use strict';
const {
  Model
} = require('sequelize');
const productos = require('./productos');

module.exports = (sequelize, DataTypes) => {
  class hubs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        hubs.hasOne(models.productos, {foreignKey:'hubId', as:'producto'});
        hubs.hasOne(models.jefes,{foreignKey:'hubId', as:'jefe'});
       
    }
  };
  hubs.init({
    nombre: { type: DataTypes.STRING, allowNull: false},
    localidad: { type: DataTypes.STRING, allowNull: false}
    // ,
    // cantidad: { type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'hubs',
  });
  return hubs;
};