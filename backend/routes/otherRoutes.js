import express from "express";
import {
  contact,
  couresRequest,
  getDashboardStats,
} from "./../controllers/otherController.js";
import { authorizeAdmin, isAuthenticated } from "./../middlewares/auth.js";

const router = express.Router();

// Contact Form
router.route("/contact").post(contact);

// Request Form
router.route("/courserequest").post(couresRequest);

// Get Admin Dashboard Stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
