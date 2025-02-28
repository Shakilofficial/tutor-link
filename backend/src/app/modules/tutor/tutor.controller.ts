import { Request, Response } from 'express';
import { tutorService } from './tutor.service';

export const tutorController = {
  async getAll(req: Request, res: Response) {
    const data = await tutorService.getAll();
    res.json(data);
  },
};
