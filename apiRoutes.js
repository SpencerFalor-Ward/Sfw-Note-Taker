var path = require('path');
var noteData = path.join(__dirname, './db/db'); //returns a string ?
var data = fs.readFileSync(noteData, 'utf8'); //returns a string ?

module.exports = function(app) {
	//displays all notes. The readFileSync does this synchronously so that it happens before other functions run to make sure data is present
	app.get('/api/notes', function(req, res) {
		let note = data ? JSON.parse(data) : { message: 'No notes found' };
		res.json(note); // response returns note as a string
	});
};

app.post('/api/notes', function(req, res) {
	var newNote = req.body; // express parses the data into an object
	noteObj = JSON.parse(noteData); // turns noteData string into an array of objects
	//need the length of object array for later code, either 1 or current length
	let noteLength =
		noteObj === 0
			? (noteLength = 1)
			: (noteLength = noteObj[noteObj.length - 1].id + 1);
	//adds the JSON the user sent
	noteData.push(newNote);
	console.log(newNote);
	res.json(newNote);
});
// delets note with 'id'
app.delete('/api/notes/:id', function(req, res) {
	var deleteNote = req.params.id;

	console.log(deleteNote);

	res.end();
});
