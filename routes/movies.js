import express from "express";
import {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  addMovies,
  updateMovieById,
} from "../helper.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (request, response) => {
  console.log(request.query);
  const { language, rating } = request.query;
  // let filteredMovies = movies;
  //   const movie = movies.find((mv) => mv.language == language);
  // if (language) {
  //   filteredMovies = filteredMovies.filter((mv) => mv.language == language);
  // }
  // if (rating) {
  //   filteredMovies = filteredMovies.filter((mv) => mv.rating == rating);
  // }
  // db.movies.find({});
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  const movies = await getAllMovies(request);
  response.send(movies);
  // response.send(filteredMovies);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  //   const movie = movies.find((mv) => mv.id == id);
  console.log(id);
  //db.movies.findOne({id:"102"})
  const movie = await getMovieById(id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send("Message: No movies found");
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  //   const movie = movies.find((mv) => mv.id == id);
  console.log(id);
  //db.movies.deleteOne({id:"102"})
  const movie = await deleteMovieById(id);
  response.send(movie);
});

router.post("/", async (request, response) => {
  const newMovies = request.body;
  console.log(newMovies);
  // const { id } = request.params;
  //   const movie = movies.find((mv) => mv.id == id);
  // console.log(id);
  //db.movies.insertMany({})
  const result = await addMovies(newMovies);
  response.send(result);
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const updateMovie = request.body;
  console.log(updateMovie);
  //   const movie = movies.find((mv) => mv.id == id);
  console.log(id);
  //db.movies.updateOne({id:"102"}, {$set: updateMovie})
  const movie = await updateMovieById(id, updateMovie);
  response.send(movie);
});

export const moviesRouter = router;
