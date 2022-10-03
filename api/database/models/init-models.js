var DataTypes = require("sequelize").DataTypes;
var _cuentas = require("./cuentas");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var cuentas = _cuentas(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  cuentas.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(cuentas, { as: "cuenta", foreignKey: "id_usuario"});

  return {
    cuentas,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
