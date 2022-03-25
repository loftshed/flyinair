const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");
const { flights, reservations } = require("./data");
require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// let data = [];
// const seats = Object.values(flights).flat();

console.log(flights);
// flights.forEach((flight) => {
//   console.log(flight);
// });
// seats.forEach((seat) => {
//   console.log(seat);
//   data.push({ _id: `${}` });
// });
// console.log(flight);

const batchImport = async () => {
  try {
    await client.connect();
    const db = client.db("slingair");
    const result = await db.collection("flights").insertMany(flights);
    console.log("Batch import successful");
  } catch (err) {
    console.log(err.stack);
    console.log("Batch import failed.");
  }
  client.close();
};

batchImport();
