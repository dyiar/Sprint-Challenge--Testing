const express = require("express");

const server = express();
server.use(express.json());
db = require("../data/dbconfig");

server.get("/", (req, res) => {
  res.status(200).json({ sanity: "check" });
});

server.post("/games", (req, res) => {
  if (req.body.title == null || req.body.genre == null) {
    res.status(422).send({ error: "information incomplete " });
  } else {
    db("games")
      .insert(req.body)
      .then(ids => {
        db("games")
          .where({ id: ids[0] })
          .then(game => {
            res.status(201).send(game);
          })
          .catch(() =>
            res.status(422).send({ error: "information incomplete" })
          );
      })
      .catch(() => res.status(500).send({ error: "data not saved" }));
  }
});

server.get('/games', (req, res) => {
    db('games').then(game => {
        res.status(200).send(game)
    })
    .catch(() => res.status(500).json({ error: 'cant get games'}))
})

module.exports = server;
