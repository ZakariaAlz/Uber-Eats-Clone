const express = require("express");
const Commande = require("../classes/CommandeClass");
const Article = require('../classes/ArticleClass')
const Client = require('../classes/ClientClass');
const router = express.Router();

// Create a Commande
router.post("/", async (req, res) => {
  try {
    const commande = req.body;
    const newCommande = await Commande.create(commande);
    res.status(201).send(newCommande);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Update a Commande
router.put("/:id", async (req, res) => {
  try {
    const commande = req.body;
    const _id = req.params.id;

    const result = await newCommande.update(_id, commande);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// // Pay a Commande
// router.put("/paiement/:id", async (req, res) => {
//   try {
//     const cmdarticle = req.body;
//     const _id = req.params.id;

//     // Loop through the selected articles and update the corresponding articles
//     for (const article of cmdarticle.articles) {
//       const existingArticle = await Article.findById(article.article);

//       if (existingArticle) {
//         // Subtract the quantity
//         existingArticle.quantite -= article.quantite;

//         // Save the updated article
//         await existingArticle.save();
//       }
//     }
    
//     const client = await Client.findById(cmdarticle.client);
//     client.solde += cmdarticle.prixtotal - cmdarticle.versement;
//     await client.save();

//     const result = await CmdArticle.update(_id, cmdarticle);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// Delete a Commande
router.delete("/:id", async (req, res) => {
  try {
    const commande = req.params.id;
    const newCommande = await Commande.remove(commande);
    res.status(200).send(newCommande);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Commande
router.get("/", async (req, res) => {
  try {
    const newCommande = await Commande.find();
    res.status(200).send(newCommande);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Commande by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newCommande = await Commande.findById(_id);
    res.status(200).send(newCommande);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Commande by client
router.get("/findcommandebyclient/:clientId", async (req, res) => {
  try {
      const {clientId} = req.params
      const newCommande = await Commande.findByClient(clientId)
      res.status(200).send(newCommande)
  } catch (error) {
      res.status(500).send(error)
  }
});

// Find a Commande by livreur
router.get("/findcommandebylivreur/:livreurId", async (req, res) => {
  try {
      const {livreurId} = req.params
      const newCommande = await Commande.findByLivreur(livreurId)
      res.status(200).send(newCommande)
  } catch (error) {
      res.status(500).send(error)
  }
});

// Find a Commande by restaurant
router.get("/findcommandebyrestaurant/:restaurantId", async (req, res) => {
  try {
      const {restaurantId} = req.params
      const newCommande = await Commande.findByRestaurant(restaurantId)
      res.status(200).send(newCommande)
  } catch (error) {
      res.status(500).send(error)
  }
});
module.exports = router;