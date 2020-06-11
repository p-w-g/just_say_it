require('dotenv').config()
const express = require('express')
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
  await userSignIn(req.body.name) ? res.send({ response: "I gotchu fam" }) : res.send({ response: "Username Already Taken" });

})
// port
server = app.listen(8080, () => {
  console.log('server is running on port', server.address().port)
})


// TODO: move helpers to separate file
let activeUsers = []

function userSignIn(name) {
  if (!name) return console.log("Missing name")
  if (name === '') return console.log("Missing name")
  if (name.match(/[^A-Za-z0-9]+/g)) return console.log("Invalid name, use only letters and numbers")
  if (activeUsers.includes(name)) return console.log("Username already taken");

  activeUsers.push(name)
  console.log('This name was added to active users: ', name)
  return true
}