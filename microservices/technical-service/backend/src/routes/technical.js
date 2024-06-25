const express = require("express");
const Technical = require("../classes/TechnicalClass");
const router = express.Router();

// Create an restaurant
router.post("/", async (req, res) => {
  try {
    const technical = req.body;
    const newRestaurant = await Technical.create(technical);
    res.status(201).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an restaurant
router.put("/:id", async (req, res) => {
  try {
    const technical = req.body;
    const _id = req.params.id;

    const result = await Technical.update(_id, technical);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an restaurant
router.delete("/:id", async (req, res) => {
  try {
    const technical = req.params.id;
    const newRestaurant = await Technical.remove(technical);
    res.status(200).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an restaurant
router.get("/", async (req, res) => {
  try {
    const technical = await Technical.find();
    res.status(200).send(technical);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an restaurant by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const technical = await Technical.findById(_id);
    res.status(200).send(technical);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/findtechnicalbyemail/:email", async (req, res) => {
  try {
      const {email} = req.params
      const technical = await Technical.findByEmail(email)
      res.status(200).send(technical)
  } catch (error) {
      res.status(500).send(error)
  }
});


module.exports = router;
