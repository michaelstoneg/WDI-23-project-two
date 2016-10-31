const mongoose = require('mongoose');

const histEventSchema = new mongoose.Schema ({
  histEvent:    { type: String, trim: true },
  description:  { type: String, trim: true },
  image:        { type: String, trim: true },
  year:         { type: Number, trim: true },
  location:     { type: String, trim: true },
  lat:          { type: Number, time: true },
  lng:          { type: Number, time: true }
});

module.exports = mongoose.model("HistEvent", histEventSchema);
