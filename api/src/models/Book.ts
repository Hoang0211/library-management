import mongoose, { Document, Schema, Types } from 'mongoose'

export enum Category {
  Journal = 'journal',
  Article = 'article',
  Book = 'book',
  Thesis = 'thesis',
  Other = 'other',
}

export enum Status {
  Available = 'available',
  Borrowed = 'borrowed',
}

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  authors: Types.ObjectId[]
  publisher: string
  publishedDate: Date
  category: string
  numPage: number
  status: Status
}

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    index: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],
  publisher: String,
  publishedDate: Date,
  category: {
    type: String,
    index: true,
    required: true,
    enum: Category,
  },
  numPage: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: Status,
    default: Status.Available,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
