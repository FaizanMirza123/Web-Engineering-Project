const mongoose = require("mongoose");

const xssSchema = new mongoose.Schema({
  useremail: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

module.exports=mongoose.model('XSS',xssSchema)
