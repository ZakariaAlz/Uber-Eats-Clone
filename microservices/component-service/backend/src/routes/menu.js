const express = require("express");
const Menu = require("../classes/MenuClass");
const Client = require('../classes/ClientClass');
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const menu = req.body;
    const newMenu = await Menu.create(menu);
    res.status(201).send(newMenu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// // Create a Pub
// router.post("/", async (req, res) => {
//   try {
//     const pub = req.body;
//     const newPub = await Menu.create(pub);
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

// Update a Pub
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

// Delete a Pub
router.delete("/:id", async (req, res) => {
  try {
    const menu = req.params.id;
    const newMenu = await Menu.remove(menu);
    res.status(200).send(newMenu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Pub
router.get("/", async (req, res) => {
  try {
    const newMenu = await Menu.find();
    res.status(200).send(newMenu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Pub by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newMenu = await Menu.findById(_id);
    res.status(200).send(newMenu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Pub by client
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
