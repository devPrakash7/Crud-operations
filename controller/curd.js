
const mongoose = require("mongoose");
const model = require("../models/curd");
const validator = require("../validation/validator");

const createUser = async (req, res) => {
  try {
    // Request body verifying
    let requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide author Detaills",
      });
    }

    //Extract body params
    const { fname, lname, title, email, password, phone, address, isDeleted } =
      requestBody;

    // Validation started & detecting here the falsy values .
    if (!validator.isValid(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "First name is required" });
    }
    if (!validator.isValid(lname)) {
      return res
        .status(400)
        .send({ status: false, message: "Last name is required" });
    }
    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title is required" });
    }
    if (!validator.isValidTitle(title)) {
      return res.status(400).send({
        status: false,
        message: `Title should be among Mr, Mrs and Miss`,
      });
    }
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Email is required` });
    }

    //Email validation whether it is entered perfectly or not.
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      res
        .status(400)
        .send({
          status: false,
          message: `Email should be a valid email address`,
        });
      return;
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: `Password is required` });
    }

    if (!validator.isValid(phone)) {
      return res
        .status(400)
        .send({ status: false, message: `Phone is required` });
    }

    if (!validator.isValid(address)) {
      return res
        .status(400)
        .send({ status: false, message: `Address is required` });
    }

    if (!validator.isValid(isDeleted)) {
      return res
        .status(400)
        .send({ status: false, message: `IsDeleted is required` });
    }

    const isEmailAlredyUsed = await model.findOne({ email: email });
    if (isEmailAlredyUsed) {
      return res.status(400).send({
        status: false,
        message: `${email} email address is already registered`,
      });
    }
    //validation Ends

    const newAuthor = await model.create(requestBody);
    return res.status(201).send({
      status: true,
      message: `Author created successfully`,
      data: newAuthor,
    });
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    if (!validator.vaildObjectId(userId)) {
      return res.status(400).send({ status: false, message: "Invalid userId" });
    }
    //getting the user document
    const user = await model.findOne({ _id: userId });
    return res
      .status(200)
      .send({ status: true, message: "get User  Details", data: user });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server not responding", error: err.message });
  }
};

const updateDetails = async (req, res) => {
  try {
    let userId = req.params.userId;

    let requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide author Detaills",
      });
    }

    if (!validator.vaildObjectId(userId)) {
      return res.status(400).send({ status: false, message: "Invalid userId" });
    }

    const updateUser = await model.findOneAndUpdate(
      { _id: userId },
      requestBody,
      { new: true, updatedAt: Date.now() }
    );

    return res
      .status(200)
      .send({
        status: true,
        message: " udated User  Details",
        data: updateUser,
      });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server not responding", error: err.message });
  }
};

const deleteDetails = async (req, res) => {
  try {
    let userId = req.params.userId;

    let requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide author Detaills",
      });
    }

    if (!validator.vaildObjectId(userId)) {
      return res.status(400).send({ status: false, message: "Invalid userId" });
    }

      let deleteUser = await model.findOneAndUpdate(
        { _id: userId },
        { $set: { isDeleted: true, deletedAt: Date.now() } },
        { new: true }
      );
    

    return res
      .status(200)
      .send({
        status: true,
        message: " Deleted User Details",
        data: deleteUser,
      });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server not responding", error: err.message });
  }
};

module.exports = { createUser, getUser, updateDetails, deleteDetails };
