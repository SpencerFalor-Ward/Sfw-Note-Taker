var path = require('path')
var fs = require('fs')
var noteData = path.join(__dirname, './db/db.json') //returns a string ?
var data = fs.readFileSync(noteData, 'utf8') //returns a string

module.exports = function(app) {
    //displays all notes. The readFileSync does this synchronously so that it happens before other functions run to make sure data is present
    app.get('/api/notes', function(req, res) {
        let note = data ? JSON.parse(data) : { message: 'No notes found' }
        res.json(note) // response returns note as a string
    })

    app.post('/api/notes', function(req, res) {
        var newNote = req.body // express parses the data into an object. this pulls all the information from the ajax request
		noteObj = JSON.parse(data) // turns noteData string into an array of objects

        //need the length of object array for later code ?, either 1 or current length
		let noteLength = noteObj === 0 ? 1 : noteObj[noteObj.length - 1].id + 1

		//adds the JSON the user sent
		//could not use req.body with forEach becasue it is an object and forEach can only be run on an array
		Object.keys(newNote).forEach(key => {
            newNote[key]
		})
        // newNote.forEach(el => {
        //     el.id = id
        //     noteObj.push(el)
        //     id++
		// })

        console.log(newNote)

        // write the new note
        fs.writeFile(noteData, JSON.stringify(noteObj), err => {
            if (err) console.log("Didn't write note")
        })
        res.json(newNote)
        return
    })

    // delets note with 'id'
    app.delete('/api/notes/:id', function(req, res) {
        var deleteNote = req.params.id // changes obj into string
        data = JSON.parse(data) // changes data into obj
        let currentNote = data.filter(
            currentNote => currentNote.id == parseInt(deleteNote)
        )
        let noteIndex = data.indexOf(currentNote)
        if (noteIndex > -1) {
            data.splice(noteIndex, 1)
            data, JSON.stringify(data)
            res, json(currentNote)
        }
        console.log(deleteNote)
        res.json(currentNote)
        return
    })
}
console.log('Test')
