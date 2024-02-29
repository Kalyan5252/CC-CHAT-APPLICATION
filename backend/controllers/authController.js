import catchAsync from './../utility/catchAsync.js';
import User from './../models/userModel.js';
import jwt from 'jsonwebtoken';
import appError from '../utility/appError.js';
import { promisify } from 'util';
import crypto from 'crypto';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;
  // console.log(token);
  if (!token)
    return next(new appError('You are not logged in!Please Login..', 401));
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new appError("User doesn't exists", 401));
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new appError('User recently changed Password! Please login', 401)
    );
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

export const loggedIn = catchAsync(async (req, res, next) => {
  // console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // console.log(decoded);
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();
      if (currentUser.changedPasswordAfter(decoded.iat)) return next();
      res.locals.user = currentUser;
      req.user = currentUser;
      return next();
    } catch (err) {
      return next(new appError(err, 401));
    }
  }
  return next(new appError('You are not logged in,Please Login...', 400));
});

export const login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    return next(new appError('Provide UserName and Password', 400));
  const user = await User.findOne({ userName: userName }).select('+password');
  //   console.log(user);
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new appError('Wrong Credentials', 401));
  createSendToken(user, 201, res);
});

export const signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, userName, password, confirmPassword } = req.body;
  // console.log({ firstName, lastName, userName, password, confirmPassword });
  const newUser = await User.create({
    firstName,
    lastName,
    userName,
    password,
    confirmPassword,
  });
  //   res.status(200).json({
  //     status: 'Success',
  //     message: `UserAccount named ${userName} is successfully created`,
  //     data: {
  //       newUser,
  //     },
  //   });
  createSendToken(newUser, 201, res);
});

export const logout = catchAsync(async (req, res, next) => {
  if (req.cookies) {
    res.cookie('jwt', 'null', {
      expiresIn: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'logged out',
  });
});
