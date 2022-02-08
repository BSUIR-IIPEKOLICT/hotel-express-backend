import { ErrorCode } from '../shared/enums'

export default class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super()
    this.status = status
    this.message = message
  }

  static authError(message): ApiError {
    return new ApiError(ErrorCode.Unauthorized, message)
  }

  static forbidden(message): ApiError {
    return new ApiError(ErrorCode.Forbidden, message)
  }

  static badRequest(message): ApiError {
    return new ApiError(ErrorCode.NotFound, message)
  }

  static internal(message): ApiError {
    return new ApiError(ErrorCode.InternalServerError, message)
  }
}
