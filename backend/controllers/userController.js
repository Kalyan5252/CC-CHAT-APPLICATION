import catchAsync from '../utility/catchAsync.js';
import User from './../models/userModel.js';
import multer from 'multer';
import sharp from 'sharp';

export const getUsers = catchAsync(async (req, res) => {
  const currentUser = req.user.id;
  const allUsers = await User.find({
    _id: { $ne: currentUser },
  }).select('-__v');
  res.status(200).json({
    allUsers,
  });
});

const storage = multer({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Save files to public/uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  },
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new appError('Upload only image files..', 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  console.log('enter');
  console.log(req.file);
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  console.log(req.file);
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    // .toFile(`/public/uploads/${req.file.filename}`);
    .toFile(`./backend/public/uploads/${req.file.filename}`);
  // next();
  res.json('file uploaded via resize');
});

export const uploadPic = upload.single('profilePic');
