import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec, { swaggerUIOptions } from './config/swagger';



// Conectar a DB
const connectDB = async () => {
  try {

    await db.authenticate();
    db.sync();
    console.log(colors.cyan.bold('Conexion exitosa a la DB'));

  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold('Error al conectar a la DB'));
  }
}

// Llamada  al DB
connectDB();


// Conexion al servidor y routing
const server = express();

// Leer datos de formularios
server.use(express.json());

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server;