const express = require("express");

const server = express();
server.use(express.json());
db = require("../data/dbconfig");

server.get("/", (req, res) => {
  res.status(200).json({ sanity: "check" });
});

server.post("/", (req, res) => {
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

module.exports = server;
