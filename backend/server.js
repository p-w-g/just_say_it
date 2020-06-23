require('dotenv').config()
const http = require("http");
const express = require('express')
const helpers = require('./helpers');
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const socketIo = require("socket.io");

// #todo:
// logout due inactivity
// logout on request
// toast - broadcast recent active users

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));
const io = socketIo(server)

io.on("connection", (socket) => {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect(async err => {
    console.log('Socket connected to DB')
    const collection = await client.db("datastore").collection("messages");

    socket.on('chat message', async (msg) => {
      await collection.insertOne(msg)
    });


    // socket.broadcast.emit('all messages here')
    const changestream = await collection.watch()

    changestream.on('change', async next => {
      const queryAll = await collection.find().toArray()

      socket.emit('all-messages', { dataset: queryAll })
    })
  });
  socket.on('disconnect', () => {
    // close DB connection here
    console.log('SOCKET client disconnected')
  })
})

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(express.json())

// routes
// fetch all messages
app.get('/api/messages', async (req, res) => {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect(async err => {
    console.log("Connected correctly to DB to fetch all messages");

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
  console.log("User logged as: ", req.body.name)
  await helpers.userSignIn(req.body.name) ? res.send({ response: "I gotchu fam" }) : res.send({ response: "Username Already Taken" });
})

// signout user
app.patch('/api/names', async (req, res) => {
  console.log("User logged out: ", req.body.name)
  await helpers.userSignOut(req.body.name)
})

// post new posts
app.post('/api/posts', async (req, res) => {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  await client.connect(async err => {
    const collection = await client.db("datastore").collection("messages");
    console.log("Connected correctly to DB to POST new Post");
    await collection.insertOne({
      name: req.body.name, message: req.body.message
    })

    client.close();
    console.log("closed the client");
  });
})




