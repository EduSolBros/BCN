const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db/database');
const Comment = require('./models/commentModel');
const CommentRepository = require('./repositories/commentRepository');
const CommentService = require('./services/commentServices');
const CommentController = require('./controllers/commentController');
const FlightController = require('./controllers/flightController');
var cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Configurar la instancia de Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.error('Error de conexión a la base de datos:', error);
  });

// Configurar el modelo Comment
Comment.sync();

// Crear instancias de las clases
const commentRepository = new CommentRepository(sequelize);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);
const flightController = new FlightController(commentService);
// Configurar las rutas
app.post('/comments', commentController.createComment);
app.get('/comments/:flightId', commentController.getCommentsByFlightId);
app.get('/flights', flightController.getFlightsByCommentFlightIds);
app.put('/comments/comment/:commentId', commentController.updateComment);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});