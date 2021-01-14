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
  let limit = parseInt(req.query.limit || "20");
  let page = parseInt(req.query.page || "0");
  const totalMovies = await Movie.countDocuments();
  const movies = await Movie.find().skip(page).limit(limit);
  const totalPages = Math.ceil(totalMovies / limit);

  console.log(totalPages);

  res.json({
    pagination: {
      totalMovies,
      limit,
      page,
      hasMore: totalMovies - (page + limit) > 0,
      totalPages,
    },
    movies,
  });
});
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const movie = await Movie.findById(req.params.id).populate("reviews.user");
  console.log(movie);
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
    //keeping the current page for when the user updates the movie like
    //list

    let limit = parseInt(req.query.limit || "20");
    let page = parseInt(req.query.page || "0");
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);
    let { user } = req;
    let { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error("Movie Not found");
    } else {
      //filtering to see if the user has already liked the movie

      console.log(movie.likes);
      let alreadyLiked = movie.likes.some(
        (l) => l.user.toString() === user._id.toString()
      );
      console.log(alreadyLiked);

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

        const updatedMovies = await Movie.find().skip(page).limit(limit);
        res.json(updatedMovies);
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
    let limit = parseInt(req.query.limit || "20");
    let page = parseInt(req.query.page || "0");
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);
    const movie = await Movie.findById(id);
    const currentUser = await User.findById(user._id).select("-cast");
    if (!movie) {
      throw new Error("Movie Not found");
    } else {
      //filtering to see if the user has already watched the movie
      let alreadyWatchedMovieList = movie.watched.some(
        (w) => w.user.toString() === user._id.toString()
      );
      let { watched } = currentUser;

      let alreadyWatchedUserMovieList = watched.some(
        (w) => w.movie.toString() === id.toString()
      );
      console.log(alreadyWatchedMovieList, alreadyWatchedUserMovieList);

      if (alreadyWatchedUserMovieList && alreadyWatchedMovieList) {
        // console.log(movie.watched.length);

        let filteredMovieWatchList = movie.watched.filter(
          (watch) => watch.user.toString() !== user._id.toString()
        );
        //checking if the user exists

        console.log(filteredMovieWatchList);

        let { watched } = currentUser;
        let filteredUserMovieWatchList = watched.filter(
          (watch) => watch.movie.toString() !== id.toString() //checking if the user exists
        );
        console.log(filteredUserMovieWatchList);

        movie.watched = filteredMovieWatchList;
        currentUser.watched = filteredUserMovieWatchList;

        let savedMovie = await movie.save();
        let savedUser = await currentUser.save();
        const updatedMovies = await Movie.find().skip(page).limit(limit);
        const updatedUser = await User.findById(user._id).populate(
          "watchedMovies.user"
        );
        res.status(200);
        res.json({ updatedMovies, updatedUser });
      } else {
        throw new Error("User hasent already watched this movie");
      }
    }
  })
);
router.post(
  "/:id/watch/add",
  protect,
  asyncHandler(async (req, res) => {
    let { user } = req;
    console.log(user);
    let { id } = req.params;
    let limit = parseInt(req.query.limit || "20");
    let page = parseInt(req.query.page || "0");
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);
    const movie = await Movie.findById(id);
    const currentUser = await User.findById(user._id);
    if (!currentUser) {
      throw new Error("User Not Found");
    } else {
      //update the movie and user watched list at the same time

      //filtering to see if the user has already watched the movie
      const alreadyWatchedMovieList = movie.watched.filter(
        (w) => w.user.toString() === user._id.toString()
      );
      //user Watched List
      const alreadyWatchedUserMovieList = currentUser.watched.filter(
        (w) => w.movie.toString() === id.toString()
      );

      if (
        alreadyWatchedMovieList.length <= 0 &&
        alreadyWatchedUserMovieList.length <= 0
      ) {
        const watchedList = {
          user: user._id,
        };
        //data to be inserted into the user model watched list array
        const watchedUserMovieList = {
          movie: id,
        };

        //adding the user to the movie model watch list
        movie.watched.push(watchedList);
        //adding the movie to the user model watch list
        currentUser.watched.push(watchedUserMovieList);

        console.log(movie, currentUser);
        let savedMovie = await movie.save();
        let savedUser = await currentUser.save();
        const updatedMovies = await Movie.find().skip(page).limit(limit);
        const updatedUser = await User.findById(user._id).populate(
          "watched.user"
        );
        // res.status(200);
        res.status(200);
        res.json({ updatedMovies, updatedUser });
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
    console.log(user._id);
    let { id } = req.params;
    let limit = parseInt(req.query.limit || "20");
    let page = parseInt(req.query.page || "0");
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);
    const movie = await Movie.findById(id);
    let { likes } = movie;
    // res.json(movie);
    if (!movie) {
      throw new Error("Movie Not found");
    } else {
      //filtering to see if the user has already liked the movie

      const alreadyLiked = likes.some(
        (l) => l.user.toString() === user._id.toString()
      );

      if (alreadyLiked) {
        let updatedLikes = likes.filter(
          (like) => like.user.toString() !== user._id.toString()
        );
        console.log(updatedLikes);

        movie.likes = updatedLikes;

        await movie.save();
        const updatedMovies = await Movie.find().skip(page).limit(limit);
        res.status(200);
        res.json(updatedMovies);
      } else {
        throw new Error("User hasent already liked the movie");
      }
    }
  })
);

module.exports = router;
