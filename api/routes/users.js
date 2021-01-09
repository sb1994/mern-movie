const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
//helps handle the thrown errors
const asyncHandler = require("express-async-handler");
const router = express.Router();

//protective middleware
const { protect } = require("../../middleware/auth");

//function to create the auth token
const createToken = require("../../utils/createToken");
router.get("/test", async (req, res) => {
  res.json({ msg: "Hello User Routes" });
});

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    //check if all inputs are filled
    if (email === "" || password === "") {
      console.log("no password or email");
      res.status(500);
      throw new Error("Please enter in both input");
    } else {
      const user = await User.findOne({ email }).populate(
        "watchedMovies.movie"
      );

      //if the user exist we then check the password

      if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          //payload for the token
          const payload = {
            _id: user.id,
          };

          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 * 1000 * 1000 * 20,
          });
          //login
          console.log(token);
          res.json({
            user,
            token,
          });
        } else {
          res.status(401);
          throw new Error("Invalid password");
        }
      } else {
        res.status(500);
        throw new Error("Invalid email");
      }
    }
  })
  //find the user by email
);
router.get(
  "/profile/:id",
  protect,
  asyncHandler(async (req, res) => {
    // console.log(req.user);
    let { id } = req.params;
    //find the user by email
    const user = await User.findById(id)
      .populate("watchedMovies.movie")
      .select("-password");
    console.log(user);

    //if the user exist we then check the password

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    } else {
      res.json(user).status(200);
    }
  })
);
router.get(
  "/current",
  protect,
  asyncHandler(async (req, res) => {
    // console.log(req.user);
    let { id } = req.user;
    console.log(req.user);
    //find the user by email
    const user = await User.findById(id)
      .populate("watchedMovies.movie")
      .select("-password");
    // console.log(user);

    //if the user exist we then check the password

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    } else {
      res.json(user).status(200);
    }
  })
);
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    let { email, password, name } = req.body;
    //find the user by email
    const userExists = await User.findOne({ email });

    //if the user exist we then check the password

    if (userExists) {
      res.status(401);
      throw new Error("User email already exists");
    } else {
      //check if the password was sent in the request
      if (!password) {
        res.status(401);
        throw new Error("Password not defined");
      } else {
        //create the new user
        const newUser = new User({
          email,
          password,
          name,
          profile_pic:
            "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
        });
        //create the hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        console.log(hashedPassword);
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();
        // console.log(savedUser);
        // const user = await User.findById(savedUser._id);
        res
          .json({
            savedUser,
            token: createToken(savedUser._id),
          })
          .status(200);
        // user.password = hashedPassword;
      }
    }
  })
);
module.exports = router;
