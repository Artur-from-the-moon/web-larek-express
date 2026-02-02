import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IToken {
  token: string;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  tokens: IToken[];
}

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<mongoose.Document<unknown, any, IUser>>
}

const tokenSchema = new mongoose.Schema<IToken>({
  token: {
    type: String,
  },
});

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальая длина поля "name" - 30 символов'],
    required: true,
    default: 'Ё-мое',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, 'Минимальная длина поля "password" - 6 символов'],
    required: true,
    select: false,
  },
  tokens: {
    type: [tokenSchema],
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user: IUser) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          return user;
        });
    });
});

export default mongoose.model<IUser, UserModel>('User', userSchema);
