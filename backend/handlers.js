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
    const flightsData = await db.collection("flights").find().toArray();
    res.status(200).json({ status: 200, flights: flightsData });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
    console.log(err);
  }
  client.close();
};

const getFlight = async ({ query: { flight } }, res) => {
  try {
    await client.connect();
    const flightData = await db.collection("flights").findOne({ _id: flight });
    console.log(flight);
    res.status(200).json({ status: 200, flight: flightData });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
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
  try {
    await client.connect();
    const reservationData = await db
      .collection("reservations")
      .find()
      .toArray();
    console.log(reservations);
    res.status(200).json({ status: 200, reservations: reservationData });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
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
