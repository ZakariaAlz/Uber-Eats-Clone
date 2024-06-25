const express = require("express");
const Sale = require("../classes/SaleClass");
const router = express.Router();

// Create an restaurant
router.post("/", async (req, res) => {
  try {
    const sale = req.body;
    const newRestaurant = await Sale.create(sale);
    res.status(201).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an restaurant
router.put("/:id", async (req, res) => {
  try {
    const sale = req.body;
    const _id = req.params.id;

    const result = await Sale.update(_id, sale);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an restaurant
router.delete("/:id", async (req, res) => {
  try {
    const sale = req.params.id;
    const newRestaurant = await Sale.remove(sale);
    res.status(200).send(newRestaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an restaurant
router.get("/", async (req, res) => {
  try {
    const sale = await Sale.find();
    res.status(200).send(sale);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an restaurant by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const sale = await Sale.findById(_id);
    res.status(200).send(sale);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/findsalebyemail/:email", async (req, res) => {
  try {
      const {email} = req.params
      const sale = await Sale.findByEmail(email)
      res.status(200).send(sale)
  } catch (error) {
      res.status(500).send(error)
  }
});


module.exports = router;
