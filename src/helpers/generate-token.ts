import jwt from 'jsonwebtoken';
import { UserToken } from '../shared/types';
import { LOCAL_JWT_SECRET } from '../shared/constants';

export default function generateToken(user: UserToken) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || LOCAL_JWT_SECRET,
    { expiresIn: '3h' }
  );
}
