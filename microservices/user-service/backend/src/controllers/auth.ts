import { Request, Response } from 'express';

export const register = (req: Request, res: Response) => {
  // Registration logic
  res.status(201).send('User registered');
};

export const login = (req: Request, res: Response) => {
  // Login logic
  res.status(200).send('User logged in');
};
