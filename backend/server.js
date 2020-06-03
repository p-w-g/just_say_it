const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://mongoAdmin:Y4fbPPSqh5EgTEs@cluster0-0xro9.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("datastore").collection("messages");

  // perform actions on the collection object
  
  // // add a record
  // collection.insertOne({
  //   name: 'anon', message: 'lorem ipsum dolor sit amet'
  // })


  // // read all records
  // let allMessages = collection.find({})

  // function iterateFunc(doc) {
  //   console.log(JSON.stringify(doc, null, 4));
  // }

  // function errorFunc(error) {
  //   console.log(error);
  // }

  // allMessages.forEach(iterateFunc, errorFunc)

  // client.close();
});



// const io = require('socket.io')()

// app.use(express.static('public'))

// // routes
// app.get('/', (req, res) => {
//   // res.render(JSON.stringify(allMessages, null, 4))
//   // res.send(allMessages)
//   // console.log("all messages", messageString)
// })

// // port
// server = app.listen(3000, () => {
//   console.log('server is running on port', server.address().port)
// })


// // connection listener
// io.on('connection', (socket) => {
//   console.log('New user connected');

// })