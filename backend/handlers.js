"use strict";
const { connect } = require("http2");
const { MongoClient } = require("mongodb");
const { reset } = require("nodemon");
const { isAbsolute } = require("path");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const db = client.db("slingair");

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = async (req, res) => {
  try {
    await client.connect();
    const flights = await db.collection("flights").find().toArray();
    console.log(flights);
    res.status(200).json({ status: 200, flights: flights });
  } catch (err) {
    res.status(500).json({ status: 500, data: err });
    console.log(err);
  }
  client.close();
};

const getFlight = async (req, res) => {
  await client.connect();
  try {
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const addReservation = async (req, res) => {
  await client.connect();
  try {
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const getReservations = async (req, res) => {
  await client.connect();
  try {
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const getSingleReservation = async (req, res) => {
  await client.connect();
  try {
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const deleteReservation = async (req, res) => {
  await client.connect();
  try {
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const updateReservation = async (req, res) => {
  await client.connect();
  try {
  } catch (err) {
    console.log(err);
  }
  client.close();
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
