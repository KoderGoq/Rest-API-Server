/* Para definir difentes rutas 
y las tengamos en archivos diferentes, 
necesitaremos un ROUTING */


import { Router } from 'express';
import { createProduct, updateProduct, getProducts, getProductByID, updateAvailability, deleteProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';


const router = Router();

// Routing - EndPoints
router.get('/', getProducts);

router.get('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  getProductByID);

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

router.patch('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  updateAvailability);

router.delete('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  deleteProduct
);

export default router;