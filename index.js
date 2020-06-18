const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const UserAuthentication = require("./src/routes/user")

let app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/user", UserAuthentication)

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Running"))