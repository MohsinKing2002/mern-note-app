const express = require('express');
const router = express.Router();
const { register, login, updateProfile, logout, deleteProfile, getSingleUser, getAllUsers, followAndUnfollow, myprofile, contactus } = require('../controllers/userController');
const {isAuthenticated} = require('../middleware/authenticate');

//register user
router.route("/register").post(register);

//login user
router.route("/login").post(login);

//myprofile
router.route("/profile").get(isAuthenticated, myprofile);

//update profile
router.route("/update").put(isAuthenticated, updateProfile);

//logout user
router.route("/logout").get(isAuthenticated, logout);

//delete profile
router.route("/delete").delete(isAuthenticated, deleteProfile);

//contact
router.route("/contact").post(isAuthenticated, contactus);

//get a single user
router.route("/users/:id").get(isAuthenticated, getSingleUser);

//get all users
router.route("/users").get(isAuthenticated, getAllUsers);

//follow or unfollow a user
router.route("/follow/:id").get(isAuthenticated, followAndUnfollow);


module.exports = router;