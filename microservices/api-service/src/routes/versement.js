const express = require("express");
const Versement = require("../classes/VersementClass");
const Client = require('../classes/ClientClass');
const router = express.Router();


// Create a Versement
router.post("/", async (req, res) => {
    try {
      const versement = req.body;
  
      // Find the client associated with the versement
      const client = await Client.findById(versement.client);
    
      // Subtract the montant from the solde of the client
      client.solde -= versement.montant;
  
      // Save the updated client
      await client.save();
  
      // Create the new Versement
      const newVersement = await Versement.create(versement);
  
      res.status(201).send(newVersement);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Update a Versement
router.put("/:id", async (req, res) => {
  try {
    const versement = req.body;
    const _id = req.params.id;

    const result = await Versement.update(_id, versement);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Versement
router.delete("/:id", async (req, res) => {
  try {
    const versement = req.params.id;
    const newVersement = await Versement.remove(versement);
    res.status(200).send(newVersement);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Versement
router.get("/", async (req, res) => {
  try {
    const newVersement = await Versement.find();
    res.status(200).send(newVersement);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Versement by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newVersement = await Versement.findById(_id);
    res.status(200).send(newVersement);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Versement by client
router.get("/findversementbyclient/:clientId", async (req, res) => {
  try {
      const {clientId} = req.params
      const newVersement = await Versement.findByClient(clientId)
      res.status(200).send(newVersement)
  } catch (error) {
      res.status(500).send(error)
  }
});

module.exports = router;
