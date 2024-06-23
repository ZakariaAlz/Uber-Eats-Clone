const express = require("express");
const Restaurant = require("../classes/RestaurantClass");
const router = express.Router();

// Create a Restaurant
router.post("/", async (req, res) => {
  try {
    const restaurant = req.body;
    const newRestaurant = await Restaurant.create(restaurant);
    res.status(201).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Restaurant
router.put("/:id", async (req, res) => {
  try {
    const restaurant = req.body;
    const _id = req.params.id;

    const result = await Restaurant.update(_id, restaurant);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Restaurant
router.delete("/:id", async (req, res) => {
  try {
    const restaurant = req.params.id;
    const newRestaurant = await Restaurant.remove(restaurant);
    res.status(200).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Restaurant
router.get("/", async (req, res) => {
  try {
    const newRestaurant = await Restaurant.find();
    res.status(200).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Restaurant by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newRestaurant = await Restaurant.findById(_id);
    res.status(200).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
