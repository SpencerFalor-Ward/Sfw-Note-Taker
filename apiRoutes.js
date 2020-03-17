var path = require('path');
var noteData = path.join(__dirname, "../db/db");


module.exports = function(app) {
    //displays all notes
	app.get('/api/notes', function(req, res) {
		res.json(noteData);
	});
	app.post('/api/notes', function(req, res) {
		var newNote = req.body;
		//adds the JSON the user sent
		noteData.push(newNote);

		console.log(newNote);
		//displays the JSON to the user
		res.json(newNote);
    });
    // delets note with 'id'
	app.delete('/api/notes/:id', function(req, res) {
		var deleteNote = req.params.id;

		console.log(deleteNote);

		res.end();
	});
};
