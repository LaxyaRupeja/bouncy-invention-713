// ****************************************************************
// You can code here only if neccesary else keep this file clean
// Try not to code on anyone else file until and unless its very neccesary ask them first in Whatsapp group
// If you didn't find a package you want to use in package.json then only install otherwise it can cause some errors
// TO START THE SERVER USE 'npm run server'
// ****************************************************************

// Imports
const express = require('express');
const connection = require('./Configs/db');
const http = require('http');
const { router } = require('./Routes/server.routes');
const { initializeSocket } = require('./Socket/socket');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

initializeSocket(server);
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use("/", router)
server.listen(process.env.PORT || 8080, connection());