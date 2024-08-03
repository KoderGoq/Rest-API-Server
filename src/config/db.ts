import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config(); // LLamamos el archivo .env
const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + '/./../models/**/*ts']
}); // Instanciamos la conexion a nuestra base de datos y colocamos el modelo de la base de datos


export default db;