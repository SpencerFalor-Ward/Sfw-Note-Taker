var path = require('path')
var fs = require('fs')
var noteData = path.join(__dirname, './db/db.json') //returns a string

module.exports = function(app) {
    //displays all notes. The readFileSync does this synchronously so that it happens before other functions run to make sure data is present
    var notes;
fs.readFile(noteData, "utf8", function(err, data) {
  notes = JSON.parse(data);
});

app.get("/api/notes", function(req, res) {
  res.json(notes);
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  newNote.id = notes.length;
  notes.push(newNote);
  saveNotes();
  res.json({ ok: true });
});

app.delete("/api/notes/:id", function(req, res) {
  notes = notes.filter(note => note.id !== parseInt(req.params.id));
  saveNotes();
  res.json({ ok: true });
});

function saveNotes() {
  fs.writeFile("db/db.json", JSON.stringify(notes), function(err) {
    if (err) throw err;
    console.log("notes saved");
  });
}
    // app.get('/api/notes', function(req, res) {

    //     console.log('Hi')
    //     fs.readFile(noteData, (err, notes) => {
    //         res.json(JSON.parse(notes))
    //     })
    //     console.log('hello')
    // })
    // app.post('/api/notes', function(req, res) {
    //     var data = fs.readFileSync(noteData, 'utf8')
    //     var newNote = req.body // express parses the data into an object
    //     var noteObj = JSON.parse(data) // turns noteData string into an array of objects
    //     newNote.id = noteObj.length
    //     noteObj.push(newNote)
    //     // write the new note
    //     fs.writeFile(noteData, JSON.stringify(noteObj), err => {
    //         if (err) console.log("Didn't write note")
    //         res.json(newNote)
    //     })
    // })
    // // delets note with 'id'
    // app.delete('/api/notes/:id', function(req, res) {
    //     var notePath = path.join(__dirname, './db/db.json')
    //     var data = fs.readFileSync(notePath, 'utf8')
    //     var deleteNote = req.params.id // changes obj into string
    //     var noteData = JSON.parse(data) // changes data inot obj
    //     let keepNotes = noteData.filter(note => {
    //         return note.id != parseInt(deleteNote)
    //     })
    //     fs.writeFile(
    //         'db/db.json',
    //         JSON.stringify(keepNotes),
    //         (err, response) => {
    //             res.json({ ok: true })
    //         }
    //     )
    // })
}
