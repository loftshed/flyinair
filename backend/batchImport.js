const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");
const { flights, reservations } = require("./data");
require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let data = [];
const flightNums = Object.keys(flights);
const seatData = Object.values(flights);

flightNums.forEach((flightNum, index) => {
  data.push({ _id: flightNum, seats: seatData[index] });
});

console.log(data);

const batchImport = async () => {
  try {
    await client.connect();
    const db = client.db("slingair");
    const result = await db.collection("flights").insertMany(data);
    console.log("Batch import successful");
  } catch (err) {
    console.log(err.stack);
    console.log("Batch import failed.");
  }
  client.close();
};

batchImport();
