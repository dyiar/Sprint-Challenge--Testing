const db = require('../data/dbconfig');

module.exports = {
    insert,
    get
}

async function insert(game) {
    const [id] = await db('games').insert(game)
    return db('games')
    .where({ id })
    .first()
}

async function get(id){
    let query = db('games');
    return query;
}