const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('flight_comments', 'sa', '1234', {
  host: 'localhost', // Cambia esto según la configuración de tu servidor MySQL
  port: 3306,
  dialect: 'mysql', // Especifica el dialecto de la base de datos (en este caso, MySQL)
});

// Prueba la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.error('Error de conexión a la base de datos:', error);
  });

module.exports = sequelize;