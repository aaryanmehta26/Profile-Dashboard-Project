const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const User = require("../models/userModal");
const generateToken = require("../utils/helper");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // before registering user, check if already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!!");
  }

  // create user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occured while creating a user !!");
  }

  res.json({
    name,
    email,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //1. find the particular user
  const user = await User.findOne({ email });

  //2. check, if the password is correct, only if user exists
  if (user && (await user.matchPassword(password))) {
    // send response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // take id from user, authmiddleware (to make sure only authenticated user can update their profile)

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    // if req body contains password, then only update the password
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
module.exports = { registerUser, loginUser, updateUserProfile };
