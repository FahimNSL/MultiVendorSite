require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require("morgan");

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');
const router = require('./routes');



const { port } = keys;

const app = express();
const corsOptions = {
  // origin: 'http://localhost:8070', // Replace with your client-side domain
  // credentials: true,
};
// app.use(cors(corsOptions));
app.use(cors("*"));



app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json());
// app.use(cors("http://localhost:8070"))
app.use(morgan("dev"))


// app.use('/', routes);



// app.use(function (req, res, next) {
//   // console.log("loggg", req.url);

//   // Website you wish to allow to connect

//   res.setHeader('Access-Control-Allow-Origin', "http://localhost:8070");
//   // res.setHeader('Content-Security-Policy', 'script-src http://localhost:3000')
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, delete');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,Accept,filename');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(router)


const server = app.listen(port, () => {
  setupDB();
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

socket(server);
