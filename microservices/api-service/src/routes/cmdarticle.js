const express = require("express");
const CmdArticle = require("../classes/CmdArticleClass");
const Article = require('../classes/ArticleClass')
const Client = require('../classes/ClientClass');
const router = express.Router();

// Create a CmdArticle
router.post("/", async (req, res) => {
  try {
    const cmdarticle = req.body;
    const newCmdarticle = await CmdArticle.create(cmdarticle);
    res.status(201).send(newCmdarticle);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Update a CmdArticle
router.put("/:id", async (req, res) => {
  try {
    const cmdarticle = req.body;
    const _id = req.params.id;

    const result = await CmdArticle.update(_id, cmdarticle);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Pay a CmdArticle
router.put("/paiement/:id", async (req, res) => {
  try {
    const cmdarticle = req.body;
    const _id = req.params.id;

    // Loop through the selected articles and update the corresponding articles
    for (const article of cmdarticle.articles) {
      const existingArticle = await Article.findById(article.article);

      if (existingArticle) {
        // Subtract the quantity
        existingArticle.quantite -= article.quantite;

        // Save the updated article
        await existingArticle.save();
      }
    }
    
    const client = await Client.findById(cmdarticle.client);
    client.solde += cmdarticle.prixtotal - cmdarticle.versement;
    await client.save();

    const result = await CmdArticle.update(_id, cmdarticle);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a CmdArticle
router.delete("/:id", async (req, res) => {
  try {
    const cmdarticle = req.params.id;
    const newCmdarticle = await CmdArticle.remove(cmdarticle);
    res.status(200).send(newCmdarticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a CmdArticle
router.get("/", async (req, res) => {
  try {
    const newCmdarticle = await CmdArticle.find();
    res.status(200).send(newCmdarticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a CmdArticle by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newCmdarticle = await CmdArticle.findById(_id);
    res.status(200).send(newCmdarticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a CmdArticle by client
router.get("/findcmdarticlebyclient/:clientId", async (req, res) => {
  try {
      const {clientId} = req.params
      const newCmdArticle = await CmdArticle.findByClient(clientId)
      res.status(200).send(newCmdArticle)
  } catch (error) {
      res.status(500).send(error)
  }
});
module.exports = router;