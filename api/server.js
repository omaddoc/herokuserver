const express = require('express');
const helmet = require('helmet');

const knex = require('../db/config.js');
const port = process.env.PORT || 9000;
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`Api running on port: ${port}`);
});

server.get('/items', async (req, res) => {
  try {
    const items = await knex('items');

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'error getting items from db' });
  }
});

server.post('/items', async (req, res) => {
  console.log(req.body);
  try {
    const result = await knex('items').insert(req.body, 'id');

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'error saving the item', error });
  }
});

// server.get('/api/notes', async (req, res) => {
//   knex('notes')
//     .then(notes => {
//       res.status(200).json(notes);
//     })
//     .catch(err => res.status(500).json(err));
// });

// server.post('/api/notes', (req, res) => {
//   const note = req.body;

//   knex('notes')
//     .insert(note)
//     .returning('id')
//     .then(ids => {
//       res.status(201).json(ids);
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Error creating note' });
//     });
// });

// server.get('/api/notes/:id', (req, res) => {
//   const { id } = req.params;

//   knex('notes')
//     .where({ id: id })
//     .then(note => {
//       res.status(200).json({ note });
//     })
//     .catch(err => res.status(500).json(err));
// });

// server.put('/api/notes/:id', (req, res) => {
//   const changes = req.body;
//   const { id } = req.params;

//   knex('notes')
//     .where({ id: id })
//     .update(changes)
//     .then(count => {
//       res.status(200).json({ count });
//     })
//     .catch(err => res.status(500).json(err));
// });

// server.delete('/api/notes/:id', (req, res) => {
//   const { id } = req.params;

//   knex('notes')
//     .where({ id: id })
//     .del()
//     .then(count => {
//       res.status(200).json({ count });
//     })
//     .catch(err => res.status(500).json(err));
// });

module.exports = server;
