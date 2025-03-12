import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from '../auth/auth.interface';
import { metaServices } from './meta.service';

const getMetaData = catchAsync(async (req, res) => {
  const result = await metaServices.getMetaData(
    req.query,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meta data retrieved successfully',
    data: result,
  });
});

export const metaControllers = {
  getMetaData,
};
