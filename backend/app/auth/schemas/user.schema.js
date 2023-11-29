import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  login: {
    type: String,
    required: [true, 'Login is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  mainPhoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  phoneNumbers: {
    type: [
      {
        name: String,
        number: String,
      },
    ],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.path('login').validate(async (login) => {
  const count = await mongoose.models.User.countDocuments({ login });
  return !count;
}, 'Login already exists');

userSchema.pre('save', function (next) {
  if (!this.tokenHash) {
    this.tokenHash = crypto.randomBytes(16).toString('hex');
  }
});

export default mongoose.model('User', userSchema);
