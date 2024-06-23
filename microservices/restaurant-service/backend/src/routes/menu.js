const express = require("express");
const Menu = require("../classes/MenuClass");
const Client = require('../classes/ClientClass');
const router = express.Router();

// Create a Menu
router.post("/", async (req, res) => {
  try {
    const menu = req.body;
    const newMenu = await Menu.create(menu);
    res.status(201).send(newMenu);
  } catch (error) {
    res.status(500).send(error);
  }
});


// router.post("/", async (req, res) => {
//   try {
//     const pub = req.body;
//     const newPub = await Pub.create(pub);
//     const client = await Client.findById(pub.client);

//     client.solde += pub.devis - pub.versement;

//     await client.save();
//     res.status(201).send(newPub);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


// // Pay a Pub
// router.put("/paiement/:id", async (req, res) => {
//   try {
//     const pub = req.body;
//     const _id = req.params.id;


//     const client = await Client.findById(pub.client);
//     client.solde += pub.devis - pub.versement;
//     await client.save();

//     const result = await Pub.update(_id, pub);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// Update a Menu
router.put("/:id", async (req, res) => {
  try {
    const menu = req.body;
    const _id = req.params.id;

    const result = await Menu.update(_id, menu);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Menu
router.delete("/:id", async (req, res) => {
  try {
    const menu = req.params.id;
    const newMenu = await Menu.remove(menu);
    res.status(200).send(newMenu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Menu
router.get("/", async (req, res) => {
  try {
    const newMenu = await Menu.find();
    res.status(200).send(newMenu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Menu by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newMenu = await Menu.findById(_id);
    res.status(200).send(newMenu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Menu by restaurant
router.get("/findmenubyrestaurant/:restaurantId", async (req, res) => {
  try {
      const {restaurantId} = req.params
      const newMenu = await Menu.findByRestaurant(restaurantId)
      res.status(200).send(newMenu)
  } catch (error) {
      res.status(500).send(error)
  }
});

module.exports = router;
