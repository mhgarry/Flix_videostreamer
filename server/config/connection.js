const mongoose = require("mongoose");

const connectToDatabase = (uri) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB database connection established successfully");
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
    });
};

module.exports = connectToDatabase;
