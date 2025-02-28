import { Request, Response } from 'express';
import { studentService } from './student.service';

export const studentController = {
  async getAll(req: Request, res: Response) {
    const data = await studentService.getAll();
    res.json(data);
  },
};
