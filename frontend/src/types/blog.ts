export interface IBlogAuthor {
  _id: string;
  name: string;
  profileImage: string;
}

export interface IBlog {
  _id: string;
  title: string;
  thumbnail: string;
  slug: string;
  content: string;
  author: IBlogAuthor;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: IBlog[];
}
