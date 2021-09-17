const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Resource", ResourceSchema);
