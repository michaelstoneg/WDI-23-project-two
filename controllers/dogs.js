const Dog = require("../models/dog");

function dogsCreate(req, res) {
 Dog.create(req.body, (err, dog) => {
   if (err) return res.status(500).json({ success: false, message: err });
   if (!dog) return res.status(500).json({ success: false, message: "Please send the correct information to create a dog." });
   return res.status(201).json(dog);
 });
}

function dogsIndex(req, res) {
 Dog.find((err, dogs) => {
   if (err) return res.status(500).json({ success: false, message: err });
   if (!dogs) return res.status(500).json({ success: false, message: "No dogs found" });
   return res.status(200).json(dogs);
 });
}

function dogsShow(req, res) {
  Dog.findById(req.params.id, (err, dog) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!dog) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(dog);
  });
}

function dogsUpdate(req, res) {
  console.log("dogs update");
  Dog.findByIdAndUpdate(req.params.id, req.body, { new: true },  (err, dog) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!dog) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(dog);
  });
}

function dogsDelete(req, res) {
  Dog.findByIdAndRemove(req.params.id, (err, dog) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!dog) return res.status(404).json({ message: "User not found." });
    return res.status(204).send();
  });
}

module.exports = {
  create: dogsCreate,
  index: dogsIndex,
  show: dogsShow,
  update: dogsUpdate,
  delete: dogsDelete
};
