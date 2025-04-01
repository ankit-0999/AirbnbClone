const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// async function main() {
//   try {
//     await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("✅ Connected to MongoDB!");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err);
//   }
// }

// const initDB = async () => {
//   try {
//     await main(); // Ensure DB connection before operations

//     initData.data = initData.data.map((obj) => ({
//       ...obj,
//       owner: new mongoose.Types.ObjectId("67a20d27f3df51e71b913b22") // ✅ Convert to ObjectId
//     }));

//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log("✅ Database initialized successfully!");
//     mongoose.connection.close(); // Close connection after operation
//   } catch (err) {
//     console.error("❌ Error initializing DB:", err);
//   }
// };

// initDB();



main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("67a5f92fe0a316c503f79fdf") // ✅ Convert to ObjectId
  }));
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
