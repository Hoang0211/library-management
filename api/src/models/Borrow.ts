import mongoose, { Document, Schema, Types } from 'mongoose'

export type BorrowDocument = Document & {
  userId: Types.ObjectId
  bookIds: Types.ObjectId[]
  loanDate: Date
  dueDate: Date
}

const borrowSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  ],
  loanDate: {
    type: Date,
    require: true,
  },
  dueDate: {
    type: Date,
    require: true,
  },
})

export default mongoose.model<BorrowDocument>('Borrow', borrowSchema)
