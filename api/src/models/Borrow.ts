import mongoose, { Document, Schema, Types } from 'mongoose'

export type BorrowDocument = Document & {
  bookId: Types.ObjectId
  userId: Types.ObjectId
  borrowDate: Date
  returnDate: Date
}

const borrowSchema = new mongoose.Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 * 2,
  },
})

export default mongoose.model<BorrowDocument>('Borrow', borrowSchema)
