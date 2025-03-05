import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { IImageFile } from '../../interface/IImageFile';
import { UserRole } from '../user/user.interface';
import { blogSearchableFields } from './blog.const';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (
  blogData: Partial<IBlog>,
  thumbnail: IImageFile | null,
  user: JwtPayload,
) => {
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
  }

  if (!blogData.title || !blogData.content || !blogData.category) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Missing required fields');
  }

  const slug = blogData.title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const blog = await Blog.create({
    ...blogData,
    slug,
    thumbnail: thumbnail?.path || blogData.thumbnail,
    author: user.userId,
  });

  return blog;
};

const updateBlog = async (
  id: string,
  blogData: Partial<IBlog>,
  thumbnail: IImageFile | null,
  user: JwtPayload,
) => {
  const existingBlog = await Blog.findById(id);

  if (!existingBlog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
  }

  if (
    existingBlog.author.toString() !== user.userId &&
    user.role !== UserRole.ADMIN
  ) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Unauthorized to update this blog',
    );
  }

  if (thumbnail) {
    blogData.thumbnail = thumbnail.path;
  }

  if (blogData.title) {
    blogData.slug = blogData.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, {
    new: true,
    runValidators: true,
  });

  return updatedBlog;
};

const togglePublishBlog = async (id: string, user: JwtPayload) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Unauthorized to publish/unpublish blog',
    );
  }

  blog.published = !blog.published;
  await blog.save();

  return blog;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author', 'name profileImage'),
    query,
  )
    .search(blogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const blogs = await blogQuery.modelQuery;
  const meta = await blogQuery.countTotal();
  return { blogs, meta };
};

const getSingleBlog = async (id: string) => {
  const blog = await Blog.findById(id).populate('author', 'name profileImage');
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const getBlogBySlug = async (slug: string) => {
  const blog = await Blog.findOne({ slug }).populate(
    'author',
    'name profileImage',
  );
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const deleteBlog = async (id: string, user: JwtPayload) => {
  const existingBlog = await Blog.findById(id);
  if (!existingBlog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Unauthorized to delete blog');
  }

  await existingBlog.deleteOne();
};

export const blogServices = {
  createBlog,
  updateBlog,
  togglePublishBlog,
  getAllBlogs,
  getSingleBlog,
  getBlogBySlug,
  deleteBlog,
};
