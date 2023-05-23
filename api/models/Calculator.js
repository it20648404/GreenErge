const mongoose = require('mongoose');

const CalSchema = new mongoose.Schema(
  {
    cal_id: {
      type: String,
      required: true,
      unique: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    points: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    carbon_percentage: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Calculator', CalSchema);
