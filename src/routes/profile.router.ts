import express from "express";
import { Profile } from "../models/Profile";

export var router = express.Router();

router.get("/api/profile", async (req, res) => {
  var profile = await Profile.find().lean();
  console.log(profile);
  res.json({ profile });
});

router.post("/api/profile", async (req, res) => {
  var { email, name, nickname } = req.body;

  let profile = await Profile.findOne({
    $or: [{ email }, { nickname }],
  }).exec();

  if (!profile) {
    profile = await Profile.create({ name, email, nickname });
  }

  res.json(profile);
});
