import mongoose from 'mongoose'

export default mongoose.model(
  'Review',
  new mongoose.Schema({
    _room: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Room',
    },
    author: { type: String, required: true },
    content: { type: String, required: true },
  })
)
