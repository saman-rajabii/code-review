import express from "express";
import { Router } from "express";
import { Simulator } from "../models/Simulator";
import cors from "cors";

var app = express();
app.use(cors());

export var router = express.Router();

router.get("/api/simulator", async (req, res) => {
  var simulator = await Simulator.find().lean();
  console.log(simulator);
  res.json({ simulator });
});

router.get("/api/simulator/:profile_id", async (req, res) => {
  console.log("========== ");
  let query = {};
  var { profile_id } = req.params;
  console.log({ profile_id });
  query = { profile_id };
  var data = await Simulator.find(query);
  res.json(data);
});

router.post("/api/simulator/:profile_id", async (req, res) => {
  var { profile_id } = req.params;
  var newData = {
    ...req.body,
    profile_id,
  };
  console.log(newData);
  var simulator = await Simulator.create(newData);
  res.json(simulator);
});
