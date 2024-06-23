const express = require("express");
const Livreur = require("../classes/LivreurClass");
const router = express.Router();

// Create a Livreur
router.post("/", async (req, res) => {
    try {
      const livreur = req.body
      const newLivreur = await Livreur.create(livreur)
      res.status(201).send(newLivreur)
  
    } catch (error) {
      res.status(500).send(error)
    }
  });


  // Update a Livreur
router.put("/:id", async (req, res) => {
    try {
      const livreur = req.body;
      const _id = req.params.id;
  
      const result = await Livreur.update(_id, livreur);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Delete a Livreur
router.delete("/:id", async (req, res) => {
    try {
      const livreur = req.params.id;
      const newLivreur = await Livreur.remove(livreur)
      res.status(200).send(newLivreur)
    } catch (error) {
      res.status(500).send(error)
    }
  });

  // Find a Livreur
router.get("/", async (req, res) => {
    try {
      const livreur = await Livreur.find()
      res.status(200).send(livreur)
    } catch (error) {
      res.status(500).send(error)
    }
  });
  
  
  // Find a Livreur by id
  router.get("/find/:id", async (req, res) => {
    try {
      const { _id } = req.params;
      const newLivreur = await Livreur.findById(_id);
      res.status(200).send(newLivreur);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
  module.exports = router;