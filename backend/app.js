import express from "express";
import * as dotenv from "dotenv";
dotenv.config(); // must have
import connect from "./db/db.js";
import cors from 'cors'
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updataUser,
} from "./handles/userHandle.js";

const app = express();
app.use(cors())
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/users", async (req, res) => {
  let user = await getUsers();
  res.send(user);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  let user = await getUser(id);
  res.send(user);
});
app.post("/users", async (req, res) => {
  let user = await addUser(req.body);
  res.send(user);
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  debugger;
  let user = await updataUser(id, req.body);
  res.send({});
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  await deleteUser(id);
  res.send({});
});

app.listen(port, async () => {
  debugger;
  await connect();
  console.log(`Example app listening on port ${port}`);
});
