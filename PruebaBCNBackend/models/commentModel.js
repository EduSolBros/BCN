const { DataTypes } = require('sequelize');
const sequelize = require('../db/database'); // Asegúrate de tener configurada tu instancia de Sequelize

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  flightId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON, // Almacena las etiquetas como un JSON
  },
}, {
  tableName: 'comments', // Nombre de la tabla en la base de datos
});

module.exports = Comment;