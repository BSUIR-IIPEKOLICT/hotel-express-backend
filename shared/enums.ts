export enum ErrorCode {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export enum ErrorMessage {
  Unknown = 'Unknown error',
  Access = 'No access',
  Auth = 'Not authorized',
  LoginData = 'Invalid login data',
  UserExists = 'User with that email already exists',
  UserNotExists = 'User not exists',
  Password = 'Invalid password',
  BadPassword = 'Bad password, use at least 5 any symbols',
  BadEmail = 'Incorrect E-mail',
}
