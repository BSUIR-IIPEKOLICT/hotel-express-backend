import mongoose from 'mongoose';
import { Role } from '../shared/enums';

export default mongoose.model(
  'User',
  new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: Role.Client, required: true, index: true },
  })
);
