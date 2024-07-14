require('dotenv').config();
require("express-async-errors");

const express = require("express")

const app = express();

require("./startup/index.startup")(app)

// Black: 30
// Red: 31
// Green: 32
// Yellow: 33
// Blue: 34
// Magenta: 35
// Cyan: 36
// White: 37