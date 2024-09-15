import request from 'supertest';
import server from '../../server';


describe('POST a /api/products', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send({})
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  })

  it('should create a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: "Celular - Test",
      price: 5000
    })
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
  })

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: "Celular - Test 2",
      price: 0
    })
    expect(response.status).toBe(400)
  })

})

describe('GET a api/products', () => {
  it('GET a JSON response with products', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('data');


    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty('errors');
  })
})

describe('GET a api/products/:id', () => {
  it('should return 404 response for a non-existent product', async () => {
    const productID = 2000;
    const response = await request(server).get(`/api/products/${productID}`);

    expect(response.status).toBe(404);
  })
})