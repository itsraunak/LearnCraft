import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Coures title"],
    minLength: [4, "Title must be at least 4 character"],
    maxLength: [80, "Title can't ecxeed 80 characters"],
  },

  description: {
    type: String,
    required: [true, "Please Enter Coures description"],
    minLength: [20, "Description must be at least 20 character"],
  },

  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],

  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  views: {
    type: Number,
    default: 0,
  },

  numOfVideos: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
    required: true,
  },

  createdBy: {
    type: String,
    required: [true, "Enter Course Creator Name"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);
