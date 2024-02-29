import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is requried'],
    },
    lastName: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      required: true,
      unique: [true, 'UserName is required'],
    },
    profilePic: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Password is requried'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'ConfirmPassword is requried'],
      select: false,
      validate: {
        validator: function (ele) {
          return ele === this.password;
        },
        message: "Passwords didn't match",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.changedPasswordAfter = function (timeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return timeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() * 60 * 1000 * 10;
  return resetToken;
};

userSchema.methods.correctPassword = async function (
  loginPassword,
  userPassword
) {
  return await bcrypt.compare(loginPassword, userPassword);
};

const user = mongoose.model('user', userSchema);

export default user;
