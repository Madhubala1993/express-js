import { client } from "./index.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function getAllMovies(request) {
  return await client
    .db("mongo_db")
    .collection("movies")
    .find(request.query)
    .toArray();
}
export async function getMovieById(id) {
  console.log(id);
  return await client
    .db("mongo_db")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
export async function deleteMovieById(id) {
  return await client
    .db("mongo_db")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
export async function addMovies(newMovies) {
  return await client.db("mongo_db").collection("movies").insertOne(newMovies);
}
export async function updateMovieById(id, updateMovie) {
  return await client
    .db("mongo_db")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: updateMovie });
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}

export async function createUser(username, hashedPassword) {
  return await client
    .db("mongo_db")
    .collection("users")
    .insertOne({ username: username, password: hashedPassword });
}

export async function getUserByName(username) {
  return await client
    .db("mongo_db")
    .collection("users")
    .findOne({ username: username });
}
