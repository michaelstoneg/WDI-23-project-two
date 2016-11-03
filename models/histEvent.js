const mongoose = require('mongoose');

const histEventSchema = new mongoose.Schema ({
  histEvent:    { type: String, trim: true },
  description:  { type: String, trim: true },
  image:        { type: String, trim: true },
  year:         { type: String, trim: true },
  location:     { type: String, trim: true },
  lat:          { type: Number, trim: true },
  lng:          { type: Number, trim: true },
  period:       { type: String, trim: true },
  clue:         { type: String, trim: true }
});

module.exports = mongoose.model("HistEvent", histEventSchema);
