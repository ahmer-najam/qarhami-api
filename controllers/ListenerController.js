const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

const { Listener } = require("../models/ListenerModel");

//Get Method
//Save Data Method
router.post("/postData", async (req, res) => {
  try {
    if (!req.body.id) {
      //Data Insertion
      req.body.createdAt = new Date();
      req.body.updatedAt = new Date();
      let _result = await Listener.create(req.body);
      if (_result.errors) res.status(500).send(_result.errors);

      _result = { ..._result._doc, id: _result._id };
      res.status(200).send(_result);
    } else {
      //Data Updation
      req.body.updatedAt = new Date();
      const _result = await Listener.findOneAndUpdate(
        { _id: req.body.id },
        req.body
      );

      if (_result.errors) res.status(500).send(_result.errors);
      res.status(200).send(req.body);
    }
  } catch (error) {
    res.status(500).send({
      message: e.message,
      success: false,
      source: process.env.API_NAME,
    });
  }
});

module.exports = router;
