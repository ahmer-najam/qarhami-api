const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Cities } = require("../models/CitiesModel");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const { sendStatus } = require("../utils/ErrLogUtil");

//Get Method
router.get("/getAllData", AuthMiddleware, async (req, res) => {
  try {
    const docs = await Cities.find();
    if (!docs) {
      sendStatus(res, 404, "Data not found", false);
    } else {
      res.send(docs);
    }
  } catch (error) {
    sendStatus(res, 500, "System error", false);
  }
});

//Get By ID Method
router.get("/getDataById/:id", async (req, res) => {
  try {
    let doc = await Cities.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!doc) sendStatus(res, 404, "Data not found", false);

    res.send(doc);
  } catch (error) {
    sendStatus(res, 500, "System error", false);
  }
});

//Duplicate City Check
router.get("/isDuplicateCity/:id/:label", async (req, res) => {
  let doc;
  if (req.params.id == -1) {
    doc = await Cities.findOne({
      cityName: { $regex: new RegExp("^" + req.params.label + "$", "i") },
    });
  } else {
    doc = await Cities.findOne({
      _id: { $ne: new ObjectId(req.params.id) },
      cityName: { $regex: new RegExp("^" + req.params.label + "$", "i") },
    });
  }

  if (!doc) {
    return res.status(200).send(false);
  } else {
    return res.status(200).send(true);
  }
});

//Save Data Method
router.post("/postData", async (req, res) => {
  try {
    if (!req.body.id) {
      //Data Insertion
      req.body.createdAt = new Date();
      req.body.updatedAt = new Date();
      let _result = await Cities.create(req.body);
      if (_result.errors) res.status(500).send(_result.errors);

      _result = { ..._result._doc, id: _result._id };
      res.status(200).send(_result);
    } else {
      //Data Updation
      req.body.updatedAt = new Date();
      const _result = await Cities.findOneAndUpdate(
        { _id: req.body.id },
        req.body
      );

      if (_result.errors) res.status(500).send(_result.errors);
      res.status(200).send(req.body);
    }
  } catch (error) {
    sendStatus(res, 500, "System error", false);
  }
});

module.exports = router;
