const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const UserAuthentication = require("./src/routes/user")
const dotenv = require('dotenv')
const dbconnect = require("./src/db")

dotenv.config()
let app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/user", UserAuthentication)

dbconnect()

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Running"))