import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from "../server.js";

// export const buySubscription = catchAsyncError(async (req, res, next) => {
//   const user = await User.findById(req.user._id);

//   if (user.role === "admin")
//     return next(new ErrorHandler("Admin can't buy subscription", 400));

//   const plan_id = process.env.PLAN_ID || "plan_LyHjWjg06is6F4";

//   const subscription = await instance.subscriptions.create({
//     plan_id,
//     customer_notify: 1,
//     total_count: 12,
//   });

//   user.subscription.id = subscription.id;
//   user.subscription.status = subscription.status;

//   await user.save();

//   res.status(201).json({
//     success: true,
//     subscriptionId: subscription.id,
//   });
// });

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 400));

  const plan_id = process.env.PLAN_ID || "plan_LyHjWjg06is6F4";

  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;

  user.subscription.status = subscription.status;

  await user.save();

  res.status(201).json({
    success: true,
    subscriptionId: subscription.id,
  });
});
