// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require('express');
const fs = require('fs');

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require('./js/apiRoutes')(app);
require('./js/htmlRoutes')(app);

//code to connect the notes.html to the db.json
const noteData = require('../../../db/db');
fs.writeFile(__dirname, noteData, (err)=>{
    if (err) throw (err);
    console.log ('This file has been saved');
});


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
	console.log('App listening on PORT: ' + PORT);
});