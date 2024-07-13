const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;
const { UserAccounts } = require("../models/UserAccountsModel");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

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
      return;
    } else {
      res.send(docs);
    }
  } catch (error) {
    console.log(e);
  }
});

//Get By Email Method
router.get("/getDataByEmail/:id", AuthMiddleware, async (req, res) => {
  try {
    let doc = await UserAccounts.findOne({
      email: req.params.id,
    });
    if (!doc) {
      res.status(404).send({
        message: "Data not found",
        success: false,
        source: process.env.API_NAME,
      });
      return;
    }

    if (doc.vehicles?.length > 0) {
      doc.vehicles = doc.vehicles.map((i) => {
        return { ...i, id: i._id };
      });
    }

    delete doc._doc.password;
    doc.id = doc._id;
    res.send(doc);
  } catch (error) {
    console.log(e);
  }
});

//ADD VEHICLE
router.post("/addVehicle", AuthMiddleware, async (req, res) => {
  try {
    const _user = await UserAccounts.findOne({ email: req.body.email });
    if (!_user) {
      res.status(404).send({
        message: "User Not Found",
      });

      return;
    }

    _user.vehicles = [req.body.vehicle, ..._user.vehicles];

    const _result = await UserAccounts.findOneAndUpdate(
      { email: req.body.email },
      _user
    );

    res.status(200).send({
      message: "Vehicle Added Successfully",
      success: true,
      data: _user,
    });
  } catch (e) {
    console.log(e);
  }
});

router.put("/updateVehicle", AuthMiddleware, async (req, res) => {
  try {
    const _user = await UserAccounts.findOne({ email: req.body.email });
    if (!_user) {
      res.status(404).send({
        message: "User Not Found",
      });
      return;
    }

    _user.vehicles = _user.vehicles.map((i) => {
      let doc = i._doc;
      // console.log(doc);
      if (doc.vin == req.body.vin) {
        return { ...i, ...req.body.vehicle };
      } else {
        return i;
      }
    });

    const _result = await UserAccounts.findOneAndUpdate(
      { email: req.body.email },
      _user
    );

    res.status(200).send({
      message: "Vehicle Updated Successfully",
      success: true,
      data: _user,
    });
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const _user = await UserAccounts.findOne({ email: req.body.email });

    if (!_user) {
      res.status(500).send({ message: "Invalid credentials", success: false });
      return;
    }

    const _isMatched = await bcrypt.compare(req.body.password, _user.password);

    if (!_isMatched) {
      res.status(500).send({ message: "Invalid credentials", success: false });
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
    console.log(e);
  }
});
module.exports = router;
