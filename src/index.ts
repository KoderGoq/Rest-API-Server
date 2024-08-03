import server from './server';
import colors from 'colors';

const port = process.env.PORT || 4000; // Definimos puerto para el servidor


server.listen(port, () => {
  console.log(colors.blue.bold(`RestAPI en el Puerto ${port}`)); // Ejecutamos el servidor
});