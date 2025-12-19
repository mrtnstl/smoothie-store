const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

async function connectDB() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    dbName: "SmoothiesDB",
  });
  console.log("Connect to mongodb memory server");
}

async function disconnectDB() {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log("Disconnect from mongodb memory server");
}

module.exports = { connectDB, disconnectDB };
