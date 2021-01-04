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
  "/:id/review/add",
  protect,
  asyncHandler(async (req, res) => {
    let { user } = req;
    let { id } = req.params;
    let { comment, rating } = req.body;
    const movie = await Movie.findById(id);

    if (!movie) {
      res.status(404);
      throw new Error("Movie Not Found");
    } else {
      //filtering to see if the user has already reviewed the movie
      const alreadyReviewed = movie.reviews.find(
        (review) => review.user.toString() === user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(401);
        throw new Error("User Has already reviewed the movie");
      } else {
        //creating the review object
        let review = {
          comment,
          user: user._id,
          movie: id,
          rating: Number(rating),
        };
        //pushing the review into the movie review array
        movie.reviews.push(review);
        await movie.save();
        //getting the updated reviews array and populating the contained user object
        let updatedMovieReviews = await Movie.findById(id)
          .populate("reviews.user")
          .select("reviews");
        res.status(200);
        res.json(updatedMovieReviews);
      }
    }
  })
);
router.post(
  "/:id/review/remove",
  protect,
  asyncHandler(async (req, res) => {
    let { user } = req;
    let { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
      res.status(404);
      throw new Error("Movie Not Found");
    } else {
      //filtering to see if the user has already reviewed the movie
      const alreadyReviewed = movie.reviews.find(
        (review) => review.user.toString() === user._id.toString()
      );

      if (alreadyReviewed) {
        let filteredMovieReviews = movie.reviews.filter((review) =>
          //checking if the user exists
          {
            review.user === user._id;
          }
        );

        movie.reviews = filteredMovieReviews;
        await movie.save();
        let updatedMovieReviews = await Movie.findById(id)
          .populate("reviews.user")
          .select("reviews");
        res.status(200);
        res.json(updatedMovieReviews);
      } else {
        //creating the review object
        res.status(404);
        throw new Error("User hasen't already reviewed the movie");
      }
    }
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

        //saving the updatedLikes array to the Movie model
        await movie.save();

        let updatedMovieLikes = await Movie.findById(id)
          .populate("likes.user")
          .select("likes");
        res.json(updatedMovieLikes);
      }
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

      if (alreadyWatchedUserMovieList && alreadyWatchedMovieList) {
        console.log(movie.watched.length);

        let filteredMovieWatchList = movie.watched.filter((watch) =>
          //checking if the user exists
          {
            watch.user !== user._id;
          }
        );
        let filteredUserMovieWatchList = currentUser.watchedMovies.filter(
          (watch) =>
            //checking if the user exists
            {
              watch.movie !== id;
            }
        );

        movie.watched = filteredMovieWatchList;
        currentUser.watchedMovies = filteredUserMovieWatchList;

        await movie.save();
        //saved to the personal watch list that is contained in the User Model
        await currentUser.save();
        let updatedMovieWatchList = await Movie.findById(id)
          .populate("watched.user")
          .select("watched");
        res.status(200);
        res.json(updatedMovieWatchList);
      } else {
        throw new Error("User Hasnet already watched this movie");
      }
    }
  })
);
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
      if (!alreadyWatchedMovieList || !alreadyWatchedUserMovieList) {
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

        await movie.save();
        await currentUser.save();
        let updatedMovieWatchList = await Movie.findById(id)
          .populate("watched.user")
          .select("watched");
        res.status(200);
        res.json(updatedMovieWatchList);
      } else {
        res.status(404);
        throw new Error("User Has already viewed this movie");
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
        await movie.save();
        let updatedMovieLikes = await Movie.findById(id)
          .populate("likes.user")
          .select("likes");
        res.status(200);
        res.json(updatedMovieLikes);
      }
    }
  })
);

module.exports = router;
