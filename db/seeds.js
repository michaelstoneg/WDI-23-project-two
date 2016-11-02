const mongoose = require('mongoose');
const HistEvent = require('../models/histEvent');
let mongoUri = process.env.MONGODB_URI || "mongodb://localhost/newapi";

mongoose.connect(mongoUri);

// mongoose.connect("mongodb://localhost/newapi");

HistEvent.collection.drop();

const histEvents = [
  {
  histEvent: "Battle of Alesia",
  description: "Honour is gained through victory. Caesar has been waging war against the fierce Gallic tribes united under Vercingetorix. A decisive victory for Caesar sees Gaul become the newest province of the Roman Empire.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Siege-alesia-vercingetorix-jules-cesar.jpg/800px-Siege-alesia-vercingetorix-jules-cesar.jpg",
  year: -52,
  location: "Eastern France",
  lat: 47.5375,
  lng: 4.4908,
  period: "Rome",
  clue: "You overhear a drunken centurion discussing that Caesar and two of the Republic's most prominent figures are planning to combine forces. You must travel south across the Alps to learn more in the capital."
},{
  histEvent: "First Triumvirate",
  description: "A marriage of convenience. Rome's best politician (Caesar), greatest military commander (Pompey) and richest man (Crassus) form an alliance, creating the First Triumvirate of Rome. The three men each have their own interests at heart and aren't fully trusting of their partners.",
  image: "https://s-media-cache-ak0.pinimg.com/564x/7f/85/be/7f85beca944e004fc326d222a472882d.jpg",
  year: -60,
  location: "Forum, Rome",
  lat: 41.8922,
  lng: 12.4852,
  period: "Rome",
  clue: "The death of Crassus has thrown the Triumvirate into chaos. Pompey, now in bed with the Senate, issued an order for Caesar to abandon his military campaigns to return to Rome. Travel north to find Caesar at the Rubicon and learn his next move."
},{
  histEvent: "Westminster Abbey",
  description: "The Tudor period begins when Henry VII is crowned at Westminster Abbey.",
  image: "",
  year: 1485,
  location: "Westminster Abbey",
  lat: 51.499417,
  lng: -0.127571,
  period: "Tudor",
  clue: "You are looking for a venue amongst the animal baiters, taverns and brothels of Southwark."
}
];

histEvents.forEach((histEvent) => {
  HistEvent.create(histEvent, (err, histEvent) => {
    if(err) {
      console.log("Something went wrong" + err);
    }
    console.log(`${histEvent.histEvent} was saved.`);

  });
});
mongoose.connection.close();
