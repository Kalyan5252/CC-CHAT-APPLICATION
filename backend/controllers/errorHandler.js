import appError from '../utility/appError.js';

const handleCastErrorDB = (err) => {
  const mesg = `Invalid ${err.path}: ${err.value}`;
  return new appError(mesg, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const mesg = `Duplicate field values found: ${value}`;
  return new appError(mesg, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const mesg = `Invalid input data.${errors.join('. ')}`;
  return new appError(mesg, 400);
};

const handleJWTError = () => {
  new appError('Invalid Token, Please login!', 401);
};

const handleJWTExpiredError = () => {
  new appError('Session Expired, Please Login', 401);
};

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      console.log('Error Occured:', err);
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CaseError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

export default errorHandler;
