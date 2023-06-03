import express, { Router } from "express";
import {
  createCourse,
  getAllCourses,
} from "../controllers/courseController.js";

const router = express.Router();

//Get All courses - Without Leactures
router.route("/courses").get(getAllCourses);

//Create Course - Only Admin
router.route("/createcourse").post(createCourse);

// Add Lectures, Detete Course , Get Course Details

// Delete lecture

export default router;
