import mongoose from 'mongoose'

export default mongoose.model(
  'Room',
  new mongoose.Schema({
    _building: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Building',
      index: true,
    },
    _type: { type: mongoose.Types.ObjectId, required: true, ref: 'Type' },
    _order: { type: mongoose.Types.ObjectId, ref: 'Order' },
    isFree: { type: Boolean, required: true, default: true },
    population: { type: Number, default: 0, required: true },
  })
)
