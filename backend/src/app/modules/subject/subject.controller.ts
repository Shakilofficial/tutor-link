import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { subjectServices } from './subject.service';

const createSubject = catchAsync(async (req, res) => {
  const subjectData = req.body;
  const result = await subjectServices.createSubject(subjectData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Subject created successfully',
    data: result,
  });
});

export const subjectControllers = {
  createSubject,
};
