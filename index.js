// const express = require("express");
// const { MongoClient } = require("mongodb");

import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";
import bcrypt from "bcrypt";

import {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  addMovies,
} from "./helper.js";

dotenv.config();

// console.log(process.env);
const app = express();
// const PORT = 9000;
const PORT = process.env.PORT;

//interceptor --> converting body to json
app.use(express.json());

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.get("/", (request, response) => {
  response.send("Hi 😊");
});

app.use("/movies", moviesRouter);

// app.use("/users", usersRouter);

app.listen(PORT, () => console.log("Server started on PORT", PORT));

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
}
console.log(genPassword("password@123"));
