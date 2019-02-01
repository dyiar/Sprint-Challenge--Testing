db = require("../data/dbconfig");

const request = require('supertest');
const gameFile = require('./games')

afterEach(async () => {
    await db('games').truncate();
})
