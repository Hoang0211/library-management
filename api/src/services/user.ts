import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ firstName: 1 })
}

const findOneForLogin = async (email: string): Promise<UserDocument | null> => {
  return User.findOne({ email })
}

const findOneForBorrow = async (
  email: string
): Promise<UserDocument | null> => {
  const foundUser = await User.findOne({ email })

  if (!foundUser) {
    throw new NotFoundError(`Email ${email} not found`)
  }

  return foundUser
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

const updateUser = async (
  userId: string,
  verifiedEmail: string | undefined,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  } else {
    if (foundUser.email !== verifiedEmail) {
      // This user is trying to update profile of another user
      throw new NotFoundError(`User ${userId} not found`)
    }
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
  findOneForLogin,
  findOneForBorrow,
  findById,
  create,
  updateUser,
  deleteUser,
}
