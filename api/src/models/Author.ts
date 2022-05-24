import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  biography: string
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  biography: {
    type: String,
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
