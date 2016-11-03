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
    histEvent: "Alea iacta est",
    description: "The die is cast. Caesar believes his political power will be irreparably diminished should he heed the Senate's summon. Knowing that doing so will trigger a civil war against Pompey, he marches his army across the river Rubicon towards Rome and utters the immortal words, 'Alea iacta est'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Roman_dice_IMG_4367.JPG/800px-Roman_dice_IMG_4367.JPG",
    year: -49,
    location: "Northern Italy",
    lat: 44.1,
    lng: 12.4,
    period: "Rome",
    clue: "Pompey has fled to Greece to conscript an army capable of fighting Caesar. Caesar conosolidates his power in Spain before assembling a fleet to track his former ally. Follow him across the Mediterranean to the Epirus."
  },{
    histEvent: "Battle of Pharsalus",
    description: "Caesar has dug in near the town of Pharsalus, Greece. His forces are running low on resources and under pressure from the Senate in search of a decisive victory, Pompey attacks Caesar in the field. Caesar takes Pompey by surprise with a counter attack against a cavalry charge and the battle is won.",
    image: "http://www.mariamilani.com/rome_pictures/Caesar_Pompey_Pharsalus_lrg.jpg",
    year: -48,
    location: "Pharsalus, Greece",
    lat: 39.3,
    lng: 22.383333,
    period: "Rome",
    clue: "Caesar returns triumphantly to Rome whilst Pompey flees in disgrace to Egypt. Follow Caesar back to the capital."
  },{
    histEvent: "Dictator perpetuo",
    description: "Dictator for life. Caesar has reached the apex of his political power in Rome and is declared 'Dictator perpetuo' to achieve monarchical status. Is this the end of the Roman Republic?",
    image: "http://www.humanities.mq.edu.au/acans/caesar/images-coins/CNG-RRC-480-6.jpg",
    year: -44,
    location: "Curia Julia, Rome",
    lat: 41.892931,
    lng: 12.485403,
    period: "Rome",
    clue: "Beware the Ides of March. Ceasar's attempts to gain greater power for himself has put him at odds with much of the Senate. A conspiracy to murder Caesar at the Theatre of Pompey is successful! End our story of Caesar by finding the murder location, between the Pantheon and the banks of the Tiber."
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
  },{
    histEvent: "Palace of Placentia",
    description: "Henry VIII was born here in 1491. It is now the Old Royal Naval College",
    image: "",
    year: 1491,
    location: "Palace of Placentia",
    lat: 51.482738,
    lng: -0.008513,
    period: "Tudor",
    clue: "It was during a performance of Henry VIII that this building burnt down in 1613. No-one was hurt although one man’s breeches did catch fire."
  },{
    histEvent: "Hampton Court Palace",
    description: "Thomas Wolsey began the construction of Hampton Court Palace, only for Henry VIII to seize it from him in 1529.",
    image: "",
    year: 1515,
    location: "Hampton Court Palace",
    lat: 51.404199,
    lng: -0.340621,
    period: "Tudor",
    clue: "The King’s Men performed here for James I, they also built the place you seek."
  },{
    histEvent: "Tower of London",
    description: "Anne Boleyn was executed here in 1536. She was the second wife of Henry VIII.",
    image: "",
    year: 1536,
    location: "Tower of London",
    lat: 51.508112,
    lng: -0.075949,
    period: "Tudor",
    clue: "In 2010 a play about the life of Anne Boleyn premiered in London, at a modern reconstruction of the portal you are looking for!"
  },{
    histEvent: "Richmond Palace",
    description: "Elizabeth I died and the Tudor period ended",
    image: "",
    year: 1603,
    location: "Richmond Palace",
    lat: 51.460388,
    lng: -0.310219,
    period: "Tudor",
    clue: "Elizabeth I was a chief patron of William Shakespeare, one of the shareholders on the building you are looking for."
  },{
    histEvent: "Middle Passage",
    description: "Up to 400 slaves bought and kidnapped from West Africa are carried as cargo under undescribably horrible conditions to the Americas to work, suffer and die on tobacco, sugar and coffee plantations so Europeans can enjoy the luxury goods.",
    image: "https://en.wikipedia.org/wiki/Middle_Passage#/media/File:Slave_ship_diagram.png",
    year: 1728,
    location: "Somewhere in the Atlantic Ocean",
    lat: 16.223337,
    lng: -51.931274,
    period: "Colonial",
    clue: "The Caribbean island where slaves were the most rebellious and stout of heart."
  },{
    histEvent: "J'Ouvert",
    description: "Refusing to suffer their souls to the same torture their bodies endured, Caribbean slaves celebrate mostly in secret. They syncretize European and African traditions into a spectacle of song and dance in which they often mocked their masters and lamented their sorry condition.",
    image: "",
    year: 1800,
    location: "St. George, Grenada",
    lat: 12.065684,
    lng: -61.750380,
    period: "Colonial",
    clue: "Runaway slaves, called 'Maroons', often made settlements in remote and mountainous regions. Especially in the English and Dutch Caribbean."
  },{
    histEvent: "Slave breeding in the United States",
    description: "After the Atlantic slave trade was abolished, slave owners, particularly in the US decided to satisfy their demand for labour by breeding their prperty. Slaves lost even more of the little personhood they had. It is from this that we get an even better idea of why the system was called 'chattel' slavery.",
    image: "",
    year: 1834,
    location: "Jacksonville, Florida, United States of America",
    lat: 30.439765,
    lng: -81.437647,
    period: "Colonial",
    clue: "Find treasure beach on the south coast of Jamaica and head north into the mountains.."
  },{
    histEvent: "Hatian Revolution",
    description: "The Haitian Revolution has often been described as the largest and most successful slave rebellion in the Western Hemisphere.  Slaves initiated the rebellion in 1791 and by 1803 they had succeeded in ending not just slavery but French control over the colony. It's main hero was non other than the great Toussaint L'Ouverture",
    image: "",
    year: 1803,
    location: "Port-au-Prince, Haiti",
    lat: 18.580524,
    lng: -72.297292,
    period: "Colonial",
    clue: "Meanwhile in Jamaica..."
  },{
    histEvent: "Emancipation Day",
    description: "After almost 2 centuries of what could be called a physical, psychological and cultural holocaust, through a combination of sustained resistance and global economic and political circumstances, Caribbean-Africans were finally able to make a huge step towards recovery.",
    image: "",
    year: 1834,
    location: "Montego Bay, Jamaica",
    lat: 18.473601,
    lng: -77.922903,
    period: "Colonial",
    clue: "On the outskirts of what is called the 'Cockpit Country', at the border between parishes, lies a town for rebels and refugees."
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
