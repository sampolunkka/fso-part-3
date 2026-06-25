const express = require('express');
const app = express();
app.use(express.json());

let notes = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "044-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

let nextId = notes.length + 1;

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
});

app.get('/api/persons', (request, response) => {
    response.json(notes)
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id === id);
    note ? response.json(note) : response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(404).json({
            error: 'name missing'
        });
    }

    if (notes.find(note => note.name === body.name)) {
        return response.status(404).json({
            error: 'name must be unique'
        });
    }

    const note = {
        name: body.name,
        number: body.number || false,
        id: nextId,
    }

    nextId++;
    notes = notes.concat(note);
    console.log(body);
    response.json(body);
});

app.get('info', (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${notes.length} people</p><p>${date}</p>`);
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});