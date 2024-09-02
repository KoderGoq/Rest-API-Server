import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

  try {
    let erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
  } catch (error) {
    console.log(error);
  }

  next()
}