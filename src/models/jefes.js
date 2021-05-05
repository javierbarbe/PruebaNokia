'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jefes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jefes.belongsTo(models.hubs,{foreignKey:'hubId', as:'almacen'});
    }
  };
  jefes.init({
    nombre: { type: DataTypes.STRING, allowNull: false},
    hubId: {type: DataTypes.INTEGER, unique:true}
  }, {
    sequelize,
    modelName: 'jefes',
  });
  return jefes;
};