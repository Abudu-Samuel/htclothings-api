import { Schema, model } from 'mongoose';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Username is required'],
    minlength: [3, 'Username length is too short'],
    maxlength: [25, 'Username length is too long']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required'],
    minlength: [3, 'Username length is too short']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password strength is not strong']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

UserSchema.methods.generateHash = password => hashSync(password, genSaltSync(8), null);

UserSchema.methods.isValidPassword = password => compareSync(password, this.password);

export default model('user', UserSchema);
