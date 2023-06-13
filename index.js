// ****************************************************************
// You can code here only if neccesary else keep this file clean
// Try not to code on anyone else file until and unless its very neccesary ask them first in Whatsapp group
// If you didn't find a package you want to use in package.json then only install otherwise it can cause some errors
// TO START THE SERVER USE 'npm run server'
// ****************************************************************

// Imports
const express = require('express');
const connection = require('./Configs/db');
const { router } = require('./Routes/server.routes');
require('dotenv').config();
// Code
const app = express();
app.use("/", router)

app.use(express.json());
app.listen(process.env.PORT || 8080, connection());