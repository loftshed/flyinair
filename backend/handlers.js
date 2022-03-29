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
    flightsData
      ? res.status(200).json({ status: 200, flights: flightsData })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const getFlight = async ({ query: { flight } }, res) => {
  try {
    await client.connect();
    const flightData = await flightsDb.findOne({ _id: flight });
    flightData
      ? res.status(200).json({ status: 200, flight: flightData })
      : res.status(500).json({
          status: 500,
          data: flight,
          message: "No flight with that ID.",
        });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const updateAvailability = async (
  { query: { flightNum, seatId, isAvailable } },
  res
) => {
  try {
    await client.connect();
    const toggle = isAvailable === "n" ? false : true;
    const { modifiedCount, matchedCount } = await flightsDb.updateOne(
      { _id: flightNum, "seats.id": seatId },
      { $set: { "seats.$.isAvailable": toggle } }
    );
    if (modifiedCount) {
      console.log({
        modifiedCount: modifiedCount,
        matchedCount: matchedCount,
        message: "Update successful",
      });
      res.status(200).json({
        status: 200,
        data: { matchFound: !!matchedCount, propsModified: modifiedCount },
      });
    } else {
      res.status(500).json({
        status: 500,
        data: { seatId: seatId, flightNum: flightNum },
        message: "Update failed.",
      });
    }
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const addReservation = async ({ body }, res) => {
  try {
    await client.connect();
    const { insertedId } = await reservationDb.insertOne(
      (body = { _id: uuidv4(), ...body })
    );
    res
      .status(201)
      .json({ status: 201, insertedId: insertedId, success: true });
  } catch (err) {
    err ? console.log(err) : client.close();
    res.status(500).json({ status: 500, data: body, error: err });
  }
};

const getReservations = async (req, res) => {
  try {
    await client.connect();
    const reservationData = await reservationDb.find().toArray();
    reservationData
      ? res.status(200).json({ status: 200, reservations: reservationData })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const getSingleReservation = async ({ query: { reservationId } }, res) => {
  try {
    await client.connect();
    const reservationData = await reservationDb.findOne({ _id: reservationId });
    reservationData
      ? res.status(200).json({ status: 200, reservation: reservationData })
      : res.status(500).json({
          status: 500,
          data: reservationId,
          message: "No reservation with that ID.",
        });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const deleteReservation = async ({ query: { reservationId } }, res) => {
  try {
    await client.connect();
    const deleteData = await reservationDb.deleteOne({ _id: reservationId });
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
    err ? console.log(err) : client.close();
  }
};

const updateReservation = async ({ query: { reservationId }, body }, res) => {
  try {
    await client.connect();
    const updatedReservation = await reservationDb.updateOne(
      { _id: reservationId },
      { $set: body }
    );
    const { modifiedCount, matchedCount } = updatedReservation;
    modifiedCount
      ? res.status(200).json({
          status: 200,
          propsModified: modifiedCount,
          success: true,
        })
      : res
          .status(500)
          .json({ status: 500, data: body, message: "Update failed." });
  } catch (err) {
    err ? console.log(err) : client.close();
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
