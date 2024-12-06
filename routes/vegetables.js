const express = require("express");
const router = express.Router();
const Vegetable = require("../models/vegetable");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const foundVegetables = await Vegetable.find({});
      res.status(200).json(foundVegetables);
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
      const createdVegetable = await Vegetable.create(req.body);
      res.status(200).redirect("/api/vegetables");
    } catch (err) {
      res.status(400).send(err);
    }
  });

router.get("/seed", async (req, res) => {
  try {
    await Vegetable.create([
      {
        name: "carrot",
        color: "orange",
        readyToEat: true,
      },
      {
        name: "spinach",
        color: "green",
        readyToEat: true,
      },
      {
        name: "broccoli",
        color: "green",
        readyToEat: false,
      },
      {
        name: "red onion",
        color: "red",
        readyToEat: true,
      },
      {
        name: "shallot",
        color: "golden brown",
        readyToEat: false,
      },
    ]);
    res.status(200).redirect("/api/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const foundVegetable = await Vegetable.findById(req.params.id);
      res.json(foundVegetable).status(200);
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
      const updatedVegetable = await Vegetable.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      console.log(updatedVegetable);
      res.redirect(`/api/vegetables/${req.params.id}`);
    } catch (err) {
      res.send(err).status(400);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedVegetable = await Vegetable.findByIdAndDelete(req.params.id);
      console.log(deletedVegetable);
      res.status(200).redirect("/api/vegetables");
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router;
