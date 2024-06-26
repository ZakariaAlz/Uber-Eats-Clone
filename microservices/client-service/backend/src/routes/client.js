const express = require("express");
const Client = require("../classes/ClientClass");
const router = express.Router();

// Create a Client
router.post("/", async (req, res) => {
    try {
      const client = req.body
      const newClient = await Client.create(client)
      res.status(201).send(newClient)
  
    } catch (error) {
      res.status(500).send(error)
    }
  });


  // Update a Client
router.put("/:id", async (req, res) => {
    try {
      const client = req.body;
      const _id = req.params.id;
  
      const result = await Client.update(_id, client);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Delete a Client
router.delete("/:id", async (req, res) => {
    try {
      const client = req.params.id;
      const newClient = await Client.remove(client)
      res.status(200).send(newClient)
    } catch (error) {
      res.status(500).send(error)
    }
  });

  // Find a Client
router.get("/", async (req, res) => {
    try {
      const clients = await Client.find()
      res.status(200).send(clients)
    } catch (error) {
      res.status(500).send(error)
    }
  });
  
  
  // Find a Client by id
  router.get("/find/:id", async (req, res) => {
    try {
      const { _id } = req.params;
      const newClient = await Client.findById(_id);
      res.status(200).send(newClient);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  router.get("/findclientbyemail/:email", async (req, res) => {
    try {
        const {email} = req.params
        const newClient = await Client.findByEmail(email)
        res.status(200).send(newClient)
    } catch (error) {
        res.status(500).send(error)
    }
  });
  
  module.exports = router;