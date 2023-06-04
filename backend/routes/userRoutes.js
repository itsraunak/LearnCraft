import express from "express";
import {
  addToPlaylist,
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
} from "./../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//To Register a new User
router.route("/register").post(register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Change Pasword
router.route("/changepassword").put(isAuthenticated, changePassword);

// UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// UpdateProfilePicture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, updateProfilePicture);

// Forget Password
router.route("/forgetpassword").post(forgetPassword);

// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Add to Playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// Remove form Playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

export default router;
