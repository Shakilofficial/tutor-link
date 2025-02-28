import { Request, Response } from 'express';
import { userService } from './user.service';

export const userController = {
  async getAll(req: Request, res: Response) {
    const data = await userService.getAll();
    res.json(data);
  },
};
