"use strict";
const { match } = require("assert");
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
const flightsDb = db.collection("flights");
const reservationDb = db.collection("reservations");

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const getFlights = async (req, res) => {
  try {
    await client.connect();
    const flightsData = await flightsDb.find().toArray();
    client.close();
    flightsData
      ? res.status(200).json({ status: 200, flights: flightsData })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    console.log(err);
  }
};

const getFlight = async ({ query: { flight } }, res) => {
  try {
    await client.connect();
    const flightData = await flightsDb.findOne({ _id: flight });
    client.close();
    flightData
      ? res.status(200).json({ status: 200, flight: flightData })
      : res.status(500).json({
          status: 500,
          data: flight,
          message: "No flight with that ID.",
        });
  } catch (err) {
    console.log(err);
  }
};

const updateAvailability = async ({ query: { flightNum, seatId } }, res) => {
  try {
    await client.connect();
    const { modifiedCount, matchedCount } = await flightsDb.updateOne(
      { _id: flightNum, "seats.id": seatId },
      { $set: { "seats.$.isAvailable": false } }
    );
    client.close();
    if (modifiedCount) {
      res.status(200).json({
        status: 200,
        matchFound: !!matchedCount,
        propsModified: modifiedCount,
      });
    } else {
      res.status(500).json({
        status: 500,
        data: { seatId: seatId, flightNum: flightNum },
        message: "Update failed.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const addReservation = async ({ body }, res) => {
  try {
    await client.connect();
    const reservationData = await reservationDb.insertOne(
      (body = { _id: uuidv4(), ...body })
    );
    client.close();
    res.status(201).json({ status: 201, data: reservationData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: body, error: err });
  }
};

const getReservations = async (req, res) => {
  try {
    await client.connect();
    const reservationData = await reservationDb.find().toArray();
    client.close();
    reservationData
      ? res.status(200).json({ status: 200, reservations: reservationData })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    console.log(err);
  }
};

const getSingleReservation = async ({ query: { reservationId } }, res) => {
  try {
    await client.connect();
    const reservationData = await reservationDb.findOne({ _id: reservationId });
    client.close();
    reservationData
      ? res.status(200).json({ status: 200, reservation: reservationData })
      : res.status(500).json({
          status: 500,
          data: reservationId,
          message: "No reservation with that ID.",
        });
  } catch (err) {
    console.log(err);
  }
};

const deleteReservation = async ({ query: { reservationId } }, res) => {
  try {
    await client.connect();
    const deleteData = await reservationDb.deleteOne({ _id: reservationId });
    client.close();
    if (deleteData.deletedCount) {
      console.log({ deleteData, message: "Delete successful" });
      res.status(204).json({ status: 204 });
    } else {
      res.status(500).json({
        status: 500,
        data: reservationId,
        message: "ID not found.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateReservation = async ({ query: { reservationId }, body }, res) => {
  try {
    await client.connect();
    const updatedReservation = await reservationDb.updateOne(
      { _id: reservationId },
      { $set: body }
    );
    client.close();
    const { modifiedCount, matchedCount } = updatedReservation;
    modifiedCount
      ? res.status(200).json({
          status: 200,
          matchFound: !!matchedCount,
          propsModified: modifiedCount,
        })
      : res
          .status(500)
          .json({ status: 500, data: body, message: "Update failed." });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getFlights,
  getFlight,
  updateAvailability,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
