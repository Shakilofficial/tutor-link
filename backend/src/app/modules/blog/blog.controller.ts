import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const thumbnail = req.file as IImageFile;

  const result = await blogServices.createBlog(req.body, thumbnail, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await blogServices.updateBlog(
    req.params.id,
    req.body,
    req.file as IImageFile,
    req.user,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const togglePublishBlog= catchAsync(async (req, res) => {
  const result = await blogServices.togglePublishBlog(req.params.id, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Blog is now ${result.published ? 'published' : 'unpublished'}`,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogs(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All blogs fetched successfully',
    meta: result.meta,
    data: result.blogs,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.getSingleBlog(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single blog fetched successfully',
    data: result,
  });
});

const getBlogBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await blogServices.getBlogBySlug(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single blog fetched successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await blogServices.deleteBlog(req.params.id, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  updateBlog,
  togglePublishBlog,
  getAllBlogs,
  getSingleBlog,
  getBlogBySlug,
  deleteBlog,
};
