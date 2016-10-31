const HistEvent = require("../models/histEvent");

function histEventsCreate(req, res) {
 HistEvent.create(req.body, (err, histEvent) => {
   if (err) return res.status(500).json({ success: false, message: err });
   if (!histEvent) return res.status(500).json({ success: false, message: "Please send the correct information to create an histEvent." });
   return res.status(201).json(histEvent);
 });
}

function histEventsIndex(req, res) {
 HistEvent.find((err, histEvents) => {
   if (err) return res.status(500).json({ success: false, message: err });
   if (!histEvents) return res.status(500).json({ success: false, message: "No histEvents found" });
   return res.status(200).json(histEvents);
 });
}

function histEventsShow(req, res) {
  HistEvent.findById(req.params.id, (err, histEvent) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!histEvent) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(histEvent);
  });
}

function histEventsUpdate(req, res) {
  console.log("histEvents update");
  HistEvent.findByIdAndUpdate(req.params.id, req.body, { new: true },  (err, histEvent) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!histEvent) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(histEvent);
  });
}

function histEventsDelete(req, res) {
  HistEvent.findByIdAndRemove(req.params.id, (err, histEvent) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!histEvent) return res.status(404).json({ message: "User not found." });
    return res.status(204).send();
  });
}

module.exports = {
  create: histEventsCreate,
  index: histEventsIndex,
  show: histEventsShow,
  update: histEventsUpdate,
  delete: histEventsDelete
};
