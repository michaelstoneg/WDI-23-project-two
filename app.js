const express =  require ('express');
const morgan =  require ('morgan');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const routes = require('./config/routes');
const app = express();
const port = process.env.PORT || 8000;
let mongoUri = process.env.MONGODB_URI || "mongodb://localhost/newapi";

mongoose.connect(mongoUri);

app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.get(`/`,(req,res) => res.render('index'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/', routes);

app.listen(port,() => console.log(`running on port: ${port}`));
