import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ firstName: 1 })
}

const findOne = async (email: string): Promise<UserDocument | null> => {
  console.log('email:', email)
  return User.findOne({ email })
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  findAll,
  findOne,
  findById,
  create,
  update,
  deleteUser,
}
