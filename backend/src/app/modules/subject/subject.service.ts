import { ISubject } from './subject.interface';
import { Subject } from './subject.model';


const createSubject = async (payload: ISubject) => {
  const subject = new Subject(payload);
  return await subject.save();
};

export const subjectServices = {
  createSubject,
};
