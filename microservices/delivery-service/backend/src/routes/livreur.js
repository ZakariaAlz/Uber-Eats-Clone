const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Livreur = require("../classes/livreur");
const auth = require("./auth/auth");

//Create Livreur in a the bdd

router.post("/", async (req, res) => {
  try {
    const livreur = req.body;
    const newLivreur = await Livreur.create(livreur);
    res.status(201).send(newLivreur);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Search for livreur

router.get("/", async (req, res) => {
  try {
    const livreur = await Livreur.find();
    res.status(200).send(livreur);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Search for a livreur using its id
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const livreur = await Livreur.findById(id);
    res.status(200).send(livreur);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update a Livreur

router.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const livreur = req.body;
    delete livreur.password;
    delete livreur._id;

    const result = await Livreur.update(_id, livreur);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Delete a livreur

router.delete("/:id", async (req, res) => {
  try {
    const livreur = req.params.id;
    const newLivreur = await Livreur.delete(livreur);
    res.status(200).send(newLivreur);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if an admin with the given email exists
    const livreur = await Livreur.findByEmail(email);

    if (!livreur) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, livreur.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    delete livreur.password;

    // Generate a token for the authenticated livreur
    const token = jwt.sign(
      { id: livreur._id, type: "livreur" },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, livreur });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/token", auth, (req, res) => {
  res.status(200).json(req.auth);
});

module.exports = router;
