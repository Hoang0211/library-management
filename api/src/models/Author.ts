import mongoose, { Document, Schema, Types } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  biography: string
  books: Types.ObjectId[]
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
    required: true,
    maxLength: 20,
  },
  lastName: {
    type: String,
    index: true,
    required: true,
    maxLength: 20,
  },
  biography: {
    type: String,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
