import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  return User.findOne({ email })
}

const findUserById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const createUser = async (user: UserDocument): Promise<UserDocument> => {
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

export default {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
}
