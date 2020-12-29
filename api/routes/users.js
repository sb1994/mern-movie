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
    //find the user by email
    const user = await User.findOne({ email });

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
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            profile_pic: user.profile_pic,
            isAdmin: user.isAdmin,
          },
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
  })
);
router.get(
  "/profile/:id",
  protect,
  asyncHandler(async (req, res) => {
    // console.log(req.user);
    let { id } = req.params;
    //find the user by email
    const user = await User.findById(id).select("-password");
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
        res
          .json({
            _id: savedUser._id,
            name: savedUser.name,
            profile: savedUser.profile_pic,
            email: savedUser.email,
            isAdmin: savedUser.isAdmin,
            profile_pic: savedUser.profile_pic,
            token: createToken(savedUser._id),
          })
          .status(200);
        // user.password = hashedPassword;
      }
    }
  })
);
module.exports = router;
