const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);


router.route("/password/forgot").post(forgotPassword);//not working idk why
router.route("/password/reset/:token").put(resetPassword);//not working idk why


router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").post(isAuthenticatedUser,updatePassword);//password is not getting updated infact the new password is getting append to that and now you can login from both the password old and new one.

router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser);

router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser).put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);








module.exports = router; 