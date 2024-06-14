const express = require("express");
const Admin = require("../classes/AdminClass");
const router = express.Router();

// Create an admin
router.post("/", async (req, res) => {
  try {
    const admin = req.body;
    const newAdmin = await Admin.create(admin);
    res.status(201).send(newAdmin);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an admin
router.put("/:id", async (req, res) => {
  try {
    const admin = req.body;
    const _id = req.params.id;

    const result = await Admin.update(_id, admin);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an admin
router.delete("/:id", async (req, res) => {
  try {
    const admin = req.params.id;
    const newAdmin = await Admin.remove(admin);
    res.status(200).send(newAdmin);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an admin
router.get("/", async (req, res) => {
  try {
    const newAdmin = await Admin.find();
    res.status(200).send(newAdmin);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an admin by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newAdmin = await Admin.findById(_id);
    res.status(200).send(newAdmin);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
