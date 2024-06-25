const express = require("express");
const Developer = require("../classes/DeveloperClass");
const router = express.Router();

// Create an restaurant
router.post("/", async (req, res) => {
  try {
    const developer = req.body;
    const newRestaurant = await Developer.create(developer);
    res.status(201).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an restaurant
router.put("/:id", async (req, res) => {
  try {
    const developer = req.body;
    const _id = req.params.id;

    const result = await Developer.update(_id, developer);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an restaurant
router.delete("/:id", async (req, res) => {
  try {
    const developer = req.params.id;
    const newRestaurant = await Developer.remove(developer);
    res.status(200).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an restaurant
router.get("/", async (req, res) => {
  try {
    const developer = await Developer.find();
    res.status(200).send(developer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an restaurant by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const developer = await Developer.findById(_id);
    res.status(200).send(developer);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/finddeveloperbyemail/:email", async (req, res) => {
  try {
      const {email} = req.params
      const developer = await Developer.findByEmail(email)
      res.status(200).send(developer)
  } catch (error) {
      res.status(500).send(error)
  }
});


module.exports = router;
