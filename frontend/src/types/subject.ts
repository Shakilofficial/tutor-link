export interface ISubject {
  _id: string;
  name: string;
  gradeLevel: string;
  category: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
