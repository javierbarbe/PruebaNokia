'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



// (sequelize, DataTypes) =>{
//   const Almacen = sequelize.define('almacenes',
//       {
//           id:{ type: DataTypes.INTEGER,primaryKey: true},
//           idarticulo:{ type: DataTypes.INTEGER, allowNull: false},
//           idencargado: { type: DataTypes.INTEGER, allowNull: false}
//         }); // cierre columnas modelo
//         const Articulo = sequelize.define('articulos', {
//           idarticulo: {type: DataTypes.INTEGER, primaryKey: true},
//             nombreArticulo:{type: DataTypes.STRING,allowNull: false} , 
//              idAlmacen:{type:DataTypes.SMALLINT, allowNull: false},
//              precio:{ type: DataTypes.INTEGER, allowNull: false}
//             }); // cierre columnas modelo
//             const Encargado = sequelize.define('encargados', {
//               id: {type: DataTypes.INTEGER, primaryKey: true},
//               nombre: {type: DataTypes.STRING,allowNull: false} , 
//              idAlmacen:{ type: DataTypes.INTEGER, allowNull: false}
//             }); // cierre columnas modelo

//             Almacen.associate= ()=> {
//               Almacen.hasMany(Articulo, {
//                 as: 'articulos',
//                 foreignKey: 'idarticulo',
//                 sourceKey: 'idarticulo'
//               });
              
//               Almacen.hasOne(Encargado);
//                 }
             










module.exports = db;
