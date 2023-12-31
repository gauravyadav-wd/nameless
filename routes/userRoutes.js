const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/signup", authController.signUp);
userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout);

userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);
userRouter.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

userRouter.use(authController.protect);
userRouter.patch(
  "/updateMe",

  userController.updateMe
);
userRouter.delete("/deleteMe", userController.deleteMe);
userRouter.get("/getMe", userController.getMe, userController.getUser);

userRouter.use(authController.restrictTo("admin"));

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
