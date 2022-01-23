import express from "express";
import { addMovies } from "../helper.js";

const router = express.Router();

router.post("/signup", async (request, response) => {
  const newMovies = request.body;
  console.log(newMovies);
  // const { id } = request.params;
  //   const movie = movies.find((mv) => mv.id == id);
  // console.log(id);
  //db.movies.insertMany({})
  const result = await addMovies(newMovies);
  response.send(result);
});

export const usersRouter = router;
