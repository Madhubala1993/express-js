// const express = require("express");
// const { MongoClient } = require("mongodb");

import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";

dotenv.config();

// console.log(process.env);
const app = express();
// const PORT = 9000;
const PORT = process.env.PORT;

//interceptor --> converting body to json
app.use(express.json());
app.use(cors());
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

app.use("/users", usersRouter);

app.listen(PORT, () => console.log("Server started on PORT", PORT));
