require('dotenv').config()
const express = require('express')
const helpers = require('./helpers')
const app = express()
const MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID

app.use(express.json())

// routes
// fetch all messages
app.get('/api/messages', async (req, res) => {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect(async err => {
    console.log("Connected correctly to DB");
    if (err) return console.error(err);

    const collection = await client.db("datastore").collection("messages");
    const queryAll = await collection.find().toArray()
    res.send({ dataset: queryAll })
    console.log("sent data");
    client.close();
    console.log("closed the client");
  });
})

// sign in a new user
app.post('/api/names', async (req, res) => {
  await helpers.userSignIn(req.body.name) ? res.send({ response: "I gotchu fam" }) : res.send({ response: "Username Already Taken" });
})

// post new posts
app.post('/api/posts', async (req, res) => {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  await client.connect(async err => {
    const collection = await client.db("datastore").collection("messages");
    console.log("Connected correctly to DB IN POSTS");
    await collection.insertOne({
      name: 'dummy', message: req.body.message
    })

    const queryAll = await collection.find().toArray()
    await res.send({ dataset: queryAll })
    console.log("sent data");
    client.close();
    console.log("closed the client");
  });
})


// port
server = app.listen(8080, () => {
  console.log('server is running on port', server.address().port)
})


