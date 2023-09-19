const {MongoClient} = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

let dataBase = "CryptoData";

async function connect()
{
    let result = await client.connect();

    db = result.db(dataBase);

    return db.collection("gets");
}

module.exports = connect;