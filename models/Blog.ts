import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "draft",
      enum: ["draft", "published"],
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 10;
        },
        message: "Tags array cannot contain more than 10 items",
      },
    },
    updated: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "general",
      // enum: ["general", "technology", "lifestyle", "travel", "food", "other"],
    },
    sharedTimes: {
      type: Number,
      default: 0,
    },
    likedTimes: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    comments: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
          maxlength: 500,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
