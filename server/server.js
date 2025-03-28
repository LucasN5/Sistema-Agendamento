import express from "express";
import cors from "cors";
import clientRoutes from "./src/routes/clientRoutes.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/api", clientRoutes);

app.listen(port, () => {
  console.log("Escutando na porta 4000");
});

/*
const express = require("express");
const cors = require("cors");

const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/adduser", (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  console.log("Username:" + username);
  console.log("Password:" + password);

  const insertSMTM = `INSERT INTO accounts (username, password) VALUES ('${username}', '${password}');`;

  pool
    .query(insertSMTM)
    .then((response) => {
      console.log("Data saved:");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response Received:" + req.body);
});

app.listen(4100, () => console.log("Server on localhost:4100"));
*/
