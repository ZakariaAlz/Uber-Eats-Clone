const express = require("express");
const Log = require("../classes/LogClass");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const log = req.body;
    const newLog = await Log.create(log);
    res.status(201).send(newLog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an log
router.put("/:id", async (req, res) => {
  try {
    const log = req.body;
    const _id = req.params.id;

    const result = await Log.update(_id, log);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an log
router.delete("/:id", async (req, res) => {
  try {
    const log = req.params.id;
    const newLog= await Log.remove(log);
    res.status(200).send(newLog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an log
router.get("/", async (req, res) => {
  try {
    const newLog = await Log.find();
    res.status(200).send(newLog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an log by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newLog = await Log.findById(_id);
    res.status(200).send(newLog);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/findlogbyrestaurant/:restaurantId", async (req, res) => {
  try {
      const {restaurantId} = req.params
      const newLog = await Log.findByRestaurant(restaurantId)
      res.status(200).send(newLog)
  } catch (error) {
      res.status(500).send(error)
  }
});

module.exports = router;