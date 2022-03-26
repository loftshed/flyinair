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

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const getFlights = async (req, res) => {
  try {
    await client.connect();
    const flightsData = await db.collection("flights").find().toArray();
    flightsData
      ? res.status(200).json({ status: 200, flights: flightsData })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const getFlight = async ({ query: { flight } }, res) => {
  try {
    await client.connect();
    const flightData = await db.collection("flights").findOne({ _id: flight });
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
  client.close();
};

const addReservation = async ({ body }, res) => {
  // todo check if reservation already exists. maybe just prevent this in frontend
  try {
    await client.connect();
    console.log(body);
    // const reservationData = await db
    //   .collection("reservations")
    //   .insertOne((body = { _id: uuidv4(), ...body }));
    // console.log(reservationData);
    res.status(201).json({ status: 201, data: body });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: body, error: err });
  }
  client.close();
};

console.log(uuidv4());

const getReservations = async (req, res) => {
  try {
    await client.connect();
    const reservationData = await db
      .collection("reservations")
      .find()
      .toArray();
    reservationData
      ? res.status(200).json({ status: 200, reservations: reservationData })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const getSingleReservation = async ({ query: { reservationId } }, res) => {
  try {
    await client.connect();
    const reservationData = await db
      .collection("reservations")
      .findOne({ _id: reservationId });
    reservationData
      ? res.status(200).json({ status: 200, flight: reservationData })
      : res.status(500).json({
          status: 500,
          data: reservationId,
          message: "No reservation with that ID.",
        });
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const deleteReservation = async ({ query: { reservationId } }, res) => {
  try {
    await client.connect();
    console.log(reservationId);
    const deleteData = await db
      .collection("reservations")
      .deleteOne({ _id: reservationId });
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
  client.close();
};

const updateReservation = async ({ query: { reservationId }, body }, res) => {
  try {
    await client.connect();
    const updatedReservation = await db
      .collection("reservations")
      .updateOne({ _id: reservationId }, { $set: body });
    const { acknowledged, modifiedCount, matchedCount } = updatedReservation;

    // try this inline wiht ternary
    if (modifiedCount) {
      res.status(200).json({
        status: 200,
        acknowledged: acknowledged,
        matchFound: !!matchedCount,
        propsModified: modifiedCount,
        message: `ID match found, ${propsModified} properties modified`,
      });
    } else if (matchedCount) {
      res.status(200).json({
        status: 200,
        acknowledged: acknowledged,
        matchFound: !!matchedCount,
        propsModified: modifiedCount,
        message: "ID match found, no data changed.",
      });
    } else {
      res
        .status(500)
        .json({ status: 500, data: body, message: "Update failed." });
    }
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
