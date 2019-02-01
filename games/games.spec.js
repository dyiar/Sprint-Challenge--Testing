db = require("../data/dbconfig");

const request = require('supertest');
const gameFile = require('./games')

afterEach(async () => {
    await db('games').truncate();
})

describe('games testing', () => {
    it('should insert a game', async () => {
        const game = await gameFile.insert({ title: 'Final Fantasy VII', genre: 'RPG' })
        const game2 = await gameFile.insert({ title: 'World of Warcraft', genre: 'MMORPG' })

        const games = await db('games');
        expect(games).toHaveLength(2)
        expect(game.title).toEqual('Final Fantasy VII')
        expect(game2.genre).toEqual('MMORPG')
    })

    it('should return an empty array if nothing is there', async () => {
        const response = await db('games');
        expect(response).toHaveLength(0);
        expect(response).toEqual([])
    })
})