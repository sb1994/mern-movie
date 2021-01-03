const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Movie = require("../models/Movie");
const User = require("../models/User");

const asyncHandler = require("express-async-handler");
const { protect } = require("../../middleware/auth");
const router = express.Router();

router.get("/test", async (req, res) => {
  res.json({ msg: "Hello Movie Routes" });
});
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});
router.post(
  "/:id/watch/add",
  protect,
  asyncHandler(async (req, res) => {
    let { user } = req;
    let { id } = req.params;
    const movie = await Movie.findById(id);
    const currentUser = await User.findById(user._id);
    if (!currentUser) {
      throw new Error("User Not Found");
    } else {
      //update the movie and user watched list at the same time

      //filtering to see if the user has already watched the movie

      const alreadyWatchedMovieList = movie.watched.find(
        (w) => w.user.toString() === user._id.toString()
      );
      //user Watched List
      const alreadyWatchedUserMovieList = currentUser.watchedMovies.find(
        (w) => w.movie.toString() === id.toString()
      );
      if (alreadyWatchedMovieList || alreadyWatchedUserMovieList) {
        throw new Error("User has already viewed this movie");
      } else {
        //data to be insertign to the Movie model
        //watched list array
        const watchedList = {
          user: user._id,
        };
        //data to be inserted into the user model watched list array
        const watchedUserMovieList = {
          movie: id,
        };
        console.log(watchedUserMovieList);

        //adding the user to the movie model watch list
        movie.watched.push(watchedList);
        //adding the movie to the user model watch list
        currentUser.watchedMovies.push(watchedUserMovieList);

        let updatedMovie = await movie.save();
        let updatedUser = await currentUser.save();
        console.log(updatedMovie);

        res.json(updatedMovie);
      }

      // res.json(movie);
    }
    // console.log(movie.watched);
  })
);
router.post(
  "/:id/like/add",
  protect,
  asyncHandler(async (req, res) => {
    let { user } = req;
    let { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error("Movie Not found");
    } else {
      //filtering to see if the user has already liked the movie

      const alreadyLiked = movie.likes.find(
        (l) => l.user.toString() === user._id.toString()
      );

      if (alreadyLiked) {
        throw new Error("User has already liked this movie");
      } else {
        //data to be inserted to the Movie model
        //likes list array
        const like = {
          user: user._id,
        };

        //adding the user to the movie model likes array
        movie.likes.push(like);

        let updatedMovie = await movie.save();

        res.json(updatedMovie);
      }

      // res.json(movie);
    }
    // console.log(movie.watched);
  })
);
router.post(
  "/:id/watch/remove",
  protect,
  asyncHandler(async (req, res) => {
    let { user } = req;
    let { id } = req.params;
    const movie = await Movie.findById(id);
    const currentUser = await User.findById(user._id);
    if (!movie) {
      throw new Error("Movie Not found");
    } else {
      //filtering to see if the user has already watched the movie
      const alreadyWatchedMovieList = movie.watched.find(
        (w) => w.user.toString() === user._id.toString()
      );
      //user Watched List
      const alreadyWatchedUserMovieList = currentUser.watchedMovies.find(
        (w) => w.movie.toString() === id.toString()
      );

      if (alreadyWatchedUserMovieList || alreadyWatchedMovieList) {
        console.log(movie.watched.length);

        let updatedMovieWatchList = movie.watched.filter((watch) =>
          //checking if the user exists
          {
            watch.user === user._id;
          }
        );
        let updatedUserMovieWatchList = currentUser.watchedMovies.filter(
          (watch) =>
            //checking if the user exists
            {
              watch.user !== user._id;
            }
        );

        movie.watched = updatedMovieWatchList;
        user.watchedMovies = updatedUserMovieWatchList;

        let updatedMovie = await movie.save();
        let updatedUser = await currentUser.save();
        res.json(updatedMovie);
      }
    }
  })
);
router.post(
  "/:id/like/remove",
  protect,
  asyncHandler(async (req, res) => {
    let { user } = req;
    let { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error("Movie Not found");
    } else {
      //filtering to see if the user has already liked the movie

      const alreadyLiked = movie.likes.find(
        (l) => l.user.toString() === user._id.toString()
      );

      if (alreadyLiked) {
        console.log(movie.likes);
        let updatedLikes = movie.likes.filter((like) =>
          //checking if the user exists
          {
            like.user !== user._id;
          }
        );
        movie.likes = updatedLikes;
        let updatedMovie = await movie.save();
        res.json(updatedMovie);
      }
    }
  })
);

module.exports = router;
