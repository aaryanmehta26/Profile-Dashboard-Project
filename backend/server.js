const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('API running');
})

app.get('/api/notes', (req, res) => {
    res.send(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const note = notes.find(note => note._id === req.params.id)
    res.send(note);
})

const PORT = process.env.PORT || 5000;

app.listen(9000, console.log(`Server started on PORT ${PORT}`));