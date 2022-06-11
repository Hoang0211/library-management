import mongoose, { Document, Schema, Types } from 'mongoose'

export type BorrowDocument = Document & {
  user: Types.ObjectId
  book: Types.ObjectId
  borrowDate: Date
  dueDate: Date
}

const borrowSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  borrowDate: {
    type: Date,
    require: true,
  },
  dueDate: {
    type: Date,
    require: true,
  },
})

export default mongoose.model<BorrowDocument>('Borrow', borrowSchema)
