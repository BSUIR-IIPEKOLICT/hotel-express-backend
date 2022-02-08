import mongoose from 'mongoose'

export default mongoose.model(
  'User',
  new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: 'client', required: true, index: true },
  })
)
