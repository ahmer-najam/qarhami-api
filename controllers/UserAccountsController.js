const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
const { UserAccounts } = require("../models/UserAccountsModel");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const { sendStatus } = require("../utils/ErrLogUtil");

//Get Method
router.get("/getAllData", AuthMiddleware, async (req, res) => {
  try {
    const docs = await UserAccounts.find();

    if (!docs) {
      res.status(404).send({
        message: "Data not found",
        success: false,
        source: process.env.API_NAME,
      });
    } else {
      res.send(docs);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      source: process.env.API_NAME,
    });
  }
});

//Get By Email Method
router.get("/getDataByEmail/:id", AuthMiddleware, async (req, res) => {
  try {
    let doc = await UserAccounts.findOne({
      email: req.params.id,
    });
    if (!doc)
      res.status(404).send({
        message: "Data not found",
        success: false,
        source: process.env.API_NAME,
      });

    res.send(doc);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      source: process.env.API_NAME,
    });
  }
});

// ---------------------- AUTH -----------------------------------------

router.post("/register", async (req, res) => {
  try {
    const userExits = await UserAccounts.findOne({ email: req.body.email });

    if (userExits) {
      return res.status(500).send({
        message: "User already exists",
        success: false,
        source: process.env.API_NAME,
      });
    }

    if (req.body.vehicles) {
      req.body.vehicles = req.body.vehicles.map((i) => {
        let newId = new ObjectId();
        return { ...i, _id: newId, id: newId };
      });
    }

    const _password = req.body.password;
    const _salt = await bcrypt.genSalt(10);
    const _hashedPassword = await bcrypt.hash(_password, _salt);
    req.body.password = _hashedPassword;
    const newUser = new UserAccounts(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (e) {
    res.status(500).send({
      message: e.message,
      success: false,
      source: process.env.API_NAME,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const _user = await UserAccounts.findOne({ email: req.body.email });
    if (!_user) {
      sendStatus(res, 500, "Invalid credentials", false);
    }

    const _isMatched = await bcrypt.compare(req.body.password, _user.password);

    if (!_isMatched) {
      sendStatus(res, 500, "Invalid credentials", false);
    } else {
      const _token = jwt.sign({ id: _user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      delete _user._doc.password;
      res.status(200).send({
        token: _token,
        ..._user._doc,
        id: _user._id,
      });
    }
  } catch (e) {
    sendStatus(res, 500, "System error", false);
  }
});
module.exports = router;
