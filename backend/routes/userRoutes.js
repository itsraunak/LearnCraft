import express from "express";
import {
  changePassword,
  getMyProfile,
  login,
  logout,
  register,
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
// Reset Password

// Add to Playlist
// Remove form Playlist

export default router;
