import express from "express";
import { createUser, genPassword, getUserByName } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/signup", async (request, response) => {
  const { username, password } = request.body;
  console.log(username, password);

  const isUserExist = await getUserByName(username);
  console.log(isUserExist);
  if (isUserExist) {
    response.status(400).send({ message: "Username already exist" });
    return;
  }
  if (
    !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
  ) {
    response.status(400).send({ message: "Password pattern does not match" });
    return;
  }
  const hashedPassword = await genPassword(password);
  const result = await createUser(username, hashedPassword);
  response.send(result);
});

router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  console.log(username, password);
  const userFromDB = await getUserByName(username);
  console.log(userFromDB);

  if (!userFromDB) {
    // response.send(userFromDB);
    response.status(400).send({ message: "Invalid credentials" });
    console.log("not present");
    return;
  }

  const storedDbPassword = userFromDB.password;
  const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);

  if (!isPasswordMatch) {
    // response.send(userFromDB);
    response.status(400).send({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);

  response.send({ message: "Successfull login", token: token });
  // response.send(isUserExist);
});

export const usersRouter = router;
