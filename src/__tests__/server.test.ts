/*
DESCRIBE es la funcion que agrupa todos los tests por hacer
TEST/IT es para colocar el texto o indicar que debe de realizar el test
EXPECT es para indicar que es lo que espero, "Un string, entero, boolean, etc.."
TOBE valor con el cuals se va a comparar
*/


// describe('Primer test', () => {
//   test('Debe revisar que 1 + 1 = 2', () => {
//     expect(1 + 1).toBe(2)
//   });

//   it('Debe revisar que 1 + 1 no sea = 3', () => {
//     expect(1 + 1).not.toBe(3)
//   });
// });

import request from 'supertest';
import server from '../server';

describe('GET /api', () => {
  it('should send back a json response', async () => {
    const res = await request(server).get('/api');
    expect(res.status).toBe(200)
    expect(res.status).not.toBe(404)

  })
})