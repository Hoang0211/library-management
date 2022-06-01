import mongoose, { Document } from 'mongoose'

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type User = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
}

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.User,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
