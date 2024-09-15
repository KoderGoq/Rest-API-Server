import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  } catch (error) {
    console.log(error);
  }

  next()
}