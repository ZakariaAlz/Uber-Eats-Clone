const express = require("express");
const Component = require("../classes/ComponentClass");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const component = req.body;
    const newArticle = await Component.create(component);
    res.status(201).send(newArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an article
router.put("/:id", async (req, res) => {
  try {
    const component = req.body;
    const _id = req.params.id;

    const result = await Component.update(_id, component);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an article
router.delete("/:id", async (req, res) => {
  try {
    const component = req.params.id;
    const newArticle= await Component.remove(component);
    res.status(200).send(newArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an article
router.get("/", async (req, res) => {
  try {
    const newArticle = await Component.find();
    res.status(200).send(newArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an article by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newArticle = await Component.findById(_id);
    res.status(200).send(newArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;