const request = require("supertest");
const server = require("./server");

afterEach(async () => {
  await db("games").truncate();
});

describe("server.js tests", () => {
  describe("GET / endpoint", () => {
    it("should respond with status code 200 OK", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
      expect(response.type).toMatch(/json/i);
    });
  });

  describe("POST /GAMES endpoint", () => {
    it("should respond with status code 201 OK", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "League of Legends", genre: "MOBA", releaseYear: 2010 });

      expect(response.status).toBe(201);
    });

    it("should respond with status code 422 if information is incomplete", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "DOTA" });

      expect(response.status).toBe(422);
    });

    it("should send back response as json", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "DOTA", genre: "MOBA" });

      expect(response.type).toMatch(/json/i);
    });

    it('should not let duplicate titles post', async () => {
        let league = await request(server)
        .post("/games")
        .send({ title: "League of Legends", genre: "MOBA", releaseYear: 2010 });
        let legends = await request(server)
        .post("/games")
        .send({ title: "League of Legends", genre: "MOBA", releaseYear: 2010 });

        expect(legends.status).toBe(405)
    })
  });

  describe("GET /GAMES endpoint", () => {
    it("should respond with status code 200 OK", async () => {
      let response = await request(server).get("/games");

      expect(response.status).toBe(200);
    });

    it("should get a list of games", async () => {
      let league = await request(server)
        .post("/games")
        .send({ title: "League of Legends", genre: "MOBA", releaseYear: 2010 });
      let dota = await request(server)
        .post("/games")
        .send({ title: "DOTA", genre: "MOBA" });
        let response = await request(server).get("/games");

      expect(response.text).toContain("League of Legends")
      expect(response.text).toContain("DOTA")
    });

    it("should return an empty array if nothing is there", async () => {
      let response = await request(server).get("/games");
      expect(response.text).toEqual('[]');
    });
  });

  describe('GET /GAMES/:ID endpoint', () => {
      it('should get the game at the ID', async () => {
          let dota = await request(server)
          .post("/games")
          .send({ title: "DOTA", genre: "MOBA" })
          let response = await request(server).get('/games')

          expect(dota).toBe(1);
          expect(response.id).toBe(1)
      })

      it('should send back 404 if ID doesnt exist', async () => {
          let response = await request(server).get('/games/4')
          expect(response.status).toBe(404)
      })
  })

});
