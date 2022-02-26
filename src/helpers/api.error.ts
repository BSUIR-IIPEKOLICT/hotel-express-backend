import { ErrorCode, ErrorMessage } from '../shared/enums';

export default class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string = ErrorMessage.BadRequest): ApiError {
    return new ApiError(ErrorCode.BadRequest, message);
  }

  static authError(message: string = ErrorMessage.Auth): ApiError {
    return new ApiError(ErrorCode.Unauthorized, message);
  }

  static forbidden(message: string = ErrorMessage.Forbidden): ApiError {
    return new ApiError(ErrorCode.Forbidden, message);
  }

  static notFound(message: string = ErrorMessage.NotFound): ApiError {
    return new ApiError(ErrorCode.NotFound, message);
  }

  static internal(message: string = ErrorMessage.Internal): ApiError {
    return new ApiError(ErrorCode.InternalServerError, message);
  }
}
