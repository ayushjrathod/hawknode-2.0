import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.single("avatar"),
  (req, res, next) => {
    if (!req.file) {
      console.log("No file uploaded.");
      return res.status(400).send("No file uploaded.");
    }
    next(); // Proceed to the next middleware (registerUser)
  },
  registerUser
);

router.route("/login").post(loginUser);

//Secured Routes
// router.route("/logout").post(verifyJWT, logoutUser);
router.route("/logout").post(logoutUser);
router.route("/refresh-token").get(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);

// router
//   .route("/update-account-details")
//   .patch(verifyJWT, upload.single("avatar"), updateAccountDetails);

router.route("/update-account-details").patch(
  upload.single("avatar"),
  (req, res, next) => {
    if (!req.file) {
      console.log("No file uploaded.");
      return res.status(400).send("No file uploaded.");
    }
    next();
  },
  updateAccountDetails
);

export default router;
