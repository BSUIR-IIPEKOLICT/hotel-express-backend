export enum ErrorCode {
  BadRequest = 400,
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
  BadRequest = 'Bad request',
  Forbidden = 'Forbidden',
  Internal = 'Internal server error',
  NotFound = 'Not found',
}

export enum EndPoint {
  Reviews = 'reviews',
  Rooms = 'rooms',
  Services = 'services',
  Types = 'types',
  Buildings = 'buildings',
  Orders = 'orders',
  Baskets = 'baskets',
  Users = 'users',

  Current = '/current',
  Register = '/register',
  Login = '/login',
  Auth = '/auth',
}

export enum Selector {
  Id = '/:id',
}

export enum Role {
  Admin = 'admin',
  Client = 'client',
}
