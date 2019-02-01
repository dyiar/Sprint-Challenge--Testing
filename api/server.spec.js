const request = require('supertest');
const server = require('./server');

describe('server.js tests', () => {
    describe('GET / endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
            expect(response.type).toMatch(/json/i)
        })

    })

    describe('POST / endpoint', () => {
        it('should respond with status code 201 OK', async () => {
            let response = await request(server).post('/').send({ title: 'League of Legends', genre: 'MOBA', releaseYear: 2010 })

            expect(response.status).toBe(201);
        })

        it('should respond with status code 422 if information is incomplete', async () => {
            let response = await request(server).post('/').send({ title: 'DOTA' })

            expect(response.status).toBe(422)
        })

        it('should send back response as json', async () => {
            let response = await request(server).post('/').send({ title: 'DOTA', genre: 'MOBA' })

            expect(response.type).toMatch(/json/i)
        })
    })
})