import mongoose from 'mongoose'

export default mongoose.model(
  'Order',
  new mongoose.Schema({
    _basket: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Basket',
      index: true,
    },
    _room: { type: mongoose.Types.ObjectId, required: true, ref: 'Room' },
    _services: [{ type: mongoose.Types.ObjectId, ref: 'Service' }],
    duty: { type: Number, required: true },
    population: { type: Number, default: 1, required: true },
    date: { type: String, required: true },
  })
)
