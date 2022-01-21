/** Imports */
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexFile = require('./knexfile.js');
const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
const jwt= require('jsonwebtoken');
const DatabaseService = require("./service/databaseService");
const ApiRouter = require("./router/apiRouter");
const database = new DatabaseService(knex);
const authClass = require("./auth")();
const apiRouter = new ApiRouter(express, database, authClass);

/** App configuration */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authClass.initialize());///
/** Router */
app.use("/api", apiRouter.router());

/** Authentication */
// app.post("/login", function(req, res) {  
//     if (req.body.username && req.body.password) {
//         var username = req.body.username;
//         var password = req.body.password;
//         console.log(username, password);
//     }
// })

/** App init */
app.listen(process.env.PORT)
console.log(`Backend running on port: ${process.env.PORT} using the ${process.env.ENVIROMENT} enviroment`);