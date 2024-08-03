import { Request, Response } from 'express';
import Product from '../models/Product.model';
import { check, validationResult } from 'express-validator';



export const createProduct = async (req: Request, res: Response) => {

  // Validacion
  await check('name').notEmpty().withMessage('El nombre del producto no debe ir vacio').run(req); // Validar que los campos del modelo no esten vacios

  await check('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no debe ir vacio')
    .custom((value) => value > 0).withMessage('El valor tiene que ser mayor a 0')
    .run(req);


  let erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  const product = await Product.create(req.body); // Creamos un nuevo producto
  res.json({ data: product }); // Lo mostramos como JSON
}