const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/lms"
    );
    console.log("DB Connected Successfully.");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1); // 🔥 stop process
  }
};

dbConnect();

module.exports = dbConnect;
