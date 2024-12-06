const express = require("express");
const router = express.Router();
const Fruit = require("../models/fruit");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const foundFruits = await Fruit.find({});
      res.status(200).json(foundFruits);
    } catch (err) {
      res.status(400).send(error);
    }
  })
  .post(async (req, res) => {
    console.log(req.body);
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    try {
      const createdFruit = await Fruit.create(req.body);
      res.status(200).redirect("/api/fruits");
    } catch (err) {
      res.status(400).send(err);
    }
  });

router.get("/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grapes",
        color: "purple",
        readyToEat: true,
      },
      {
        name: "apple",
        color: "green",
        readyToEat: false,
      },
      {
        name: "fig",
        color: "yellow",
        readyToEat: true,
      },
      {
        name: "grapes",
        color: "green",
        readyToEat: false,
      },
    ]);
    res.status(200).redirect("/api/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const foundFruit = await Fruit.findById(req.params.id);
      res.json(foundFruit).status(200);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  .put(async (req, res) => {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    try {
      const updatedFruit = await Fruit.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      console.log(updatedFruit);
      res.redirect(`/api/fruits/${req.params.id}`);
    } catch (err) {
      res.send(err).status(400);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
      console.log(deletedFruit);
      res.status(200).redirect("/api/fruits");
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router;
