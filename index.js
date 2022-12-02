const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

//middle ware
app.use(cors());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.j5z5yuh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const rentPropertiesCollection = client
      .db("Property")
      .collection("rentProperties");

    //get all data from db
    app.get("/rentProperties", async (req, res) => {
      let name = req.query.name;
      let price = parseInt(req.query.price);
      let location = req.query.location;
      let date = req.query.date;

      const query = {
        name: name,
        price: price,
        location: location,
        date: date,
      };
      const result = await rentPropertiesCollection.find(query).toArray();
      res.send(result);
    });
    //update data
    // app.get("/properties", async (req, res) => {
    //   const query = {};
    //   const option = { upsert: true };
    //   const updatedDoc = {
    //     $set: {
    //       location: "New-York,USA",
    //     },
    //   };
    //   const result = await rentPropertiesCollection.updateMany(
    //     query,
    //     updatedDoc,
    //     option
    //   );
    //   res.send(result);
    // });
  } finally {
  }
}

run().catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("hello author");
});
app.listen(port, () => {
  console.log(`The running port is ${port}`);
});
