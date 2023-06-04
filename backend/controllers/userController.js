import { catchAsyncError } from "./../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { User } from "./../models/User.js";
import { Course } from "./../models/Course.js";
import crypto from "crypto";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("please Enter all field", 400));
  }
  // const file = req.file;

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User Already Exists", 409));

  //upload file on cloudinary;

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempId",
      url: "tempUrl",
    },
  });

  sendToken(res, user, "User Registerd Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter all Fields", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User Dosen't exist", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch) return next(new ErrorHandler("Invalid Credentials", 401));

  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please Enter All Fields", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  // Cloudinary :TODO

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("User not found", 400));

  const resetToken = await user.getResetToken();
  await user.save();
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const message = `Click on the link to reset your password. ${url}. If you have not requested then please ignore.`;

  // send token via email
  await sendEmail(user.email, "LearnCraft Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Token is invalid or has been Expired", 401));

  user.password = req.body.password;
  user.resetPasswordExpires = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Chnaged Successfully",
    token,
  });
});

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.body.id);

  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExist) return next(new ErrorHandler("Course Already Exists", 409));

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Added To Playlist",
  });
});

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Removed From Playlist",
  });
});
