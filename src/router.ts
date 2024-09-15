/* Para definir difentes rutas 
y las tengamos en archivos diferentes, 
necesitaremos un ROUTING */


import { Router } from 'express';
import { createProduct, updateProduct, getProducts, getProductByID, updateAvailability, deleteProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';


const router = Router();

/**
* @swagger
* components:  
*   schemas:
*     Product:
*       type: object
*       properties:
*         id: 
*           type: integer
*           description: The Product ID
*           example: 1
*         name:
*           type: string
*           description: The Product name
*           example: Monitor Curvo de 50 pulgadas
*         price: 
*           type: number
*           description: The Product Price
*           example: 300
*         availability:
*           type: boolean
*           description: The Product availability
*           example: true
*/


/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Product'
 */

// Routing - EndPoints
router.get('/', getProducts);

/**
 * @swagger
 * 
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      decription: The id of the product to retieve
 *      required: true
 *      schema:
 *        type: integer
 * 
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request, invalid ID
 *      404:
 *        description: Product not found
 */

router.get('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  getProductByID);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: 'Monitor Curvo 55 Pulgadas'
 * 
 *                price: 
 *                  type: number
 *                  example: 399
 *    responses:
 *      201:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - invalid input data
 */

router.post('/',

  // Validacion
  body('name').notEmpty().withMessage('El nombre del producto no debe ir vacio'), // Validar que los campos del modelo no esten vacios
  body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no debe ir vacio')
    .custom((value) => value > 0).withMessage('El valor tiene que ser mayor a 0'),

  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product with user input
 *    tags:
 *      - Products
 *    description: Return the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      decription: The id of the product to retieve
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: 'Monitor Curvo 50 Pulgadas'
 *                price: 
 *                  type: number
 *                  example: 300
 *                availability:
 *                  type: boolean
 *                  example: true
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'   
 *      400:
 *        description: Bad request, Invalid ID or Invalid input data
 *      404:
 *        description: Product not found
 */

router.put('/:id',

  body('name').notEmpty().withMessage('El nombre del producto no debe ir vacio'), // Validar que los campos del modelo no esten vacios
  body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no debe ir vacio')
    .custom((value) => value > 0).withMessage('El valor tiene que ser mayor a 0'),
  body('availability').isBoolean().withMessage('Valor de disponibilidad no valido'),

  handleInputErrors,
  updateProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      decription: The ID of the product to retieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'   
 *      400:
 *        description: Bad request, Invalid ID
 *      404:
 *        description: Product not found
 */

router.patch('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  updateAvailability);


/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a certain product by ID
 *    tags:
 *      - Products
 *    description: Return a comfirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      decription: The ID of the product to delete
 *      required: true
 *      schema:
 *        type: integer      
 *    responses:
 *      200:
 *        description: Successful Updated
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              description: 'Producto Eliminado'
 *      400:
 *        description: Bad request, Invalid ID
 *      404:
 *        description: Product not found
 */

router.delete('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  deleteProduct
);

export default router;