import mongoose from 'mongoose'

export default mongoose.model(
  'Service',
  new mongoose.Schema({
    name: { type: String, required: true, unique: true, index: true },
    price: { type: Number, default: 0, required: true },
  })
)
