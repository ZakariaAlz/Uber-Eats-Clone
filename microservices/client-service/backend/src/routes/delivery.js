const express = require("express");
const Delivery = require("../classes/DeliveryClass");
const router = express.Router();


// Create a delivery
router.post("/", async (req, res) => {
    try {
      const delivery = req.body;
      const newDilevery = await Delivery.create(delivery);
  
      res.status(201).send(newDelivery);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Update a delivery
router.put("/:id", async (req, res) => {
  try {
    const delivery = req.body;
    const _id = req.params.id;

    const result = await Delivery.update(_id, delivery);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a delivery
router.delete("/:id", async (req, res) => {
  try {
    const delivery = req.params.id;
    const newDelivery = await Delivery.remove(delivery);
    res.status(200).send(newDelivery);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a delivery
router.get("/", async (req, res) => {
  try {
    const newDelivery = await Delivery.find();
    res.status(200).send(newDelivery);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a delivery by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newDelivery = await Delivery.findById(_id);
    res.status(200).send(newDelivery);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/finddeliverybyemail/:email", async (req, res) => {
  try {
      const {email} = req.params
      const newDelivery = await Delivery.findByEmail(email)
      res.status(200).send(newDelivery)
  } catch (error) {
      res.status(500).send(error)
  }
});


module.exports = router;
