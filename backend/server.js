require('dotenv').config()
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID


const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   console.log("Connected correctly to DB");
//   const collection = client.db("datastore").collection("messages");

// perform actions on the collection object

// // add a record
// collection.insertOne({
//   name: 'anon', message: 'lorem ipsum dolor sit amet'
// })

// collection.insertMany([
//   {
//     name: 'anon1',
//     message: 'lorem ipsum dolor sit amet'
//   },
//   {
//     name: 'anon2',
//     message: 'lorem ipsum dolor sit amet'
//   },
//   {
//     name: 'anon3',
//     message: 'lorem ipsum dolor sit amet'
//   },
//   {
//     name: 'anon1',
//     message: 'lorem ipsum dolor sit amet'
//   }])


// // read all records
// let allMessages = collection.find({})

// function iterateFunc(doc) {
//   console.log(JSON.stringify(doc, null, 4));
// }

// function errorFunc(error) {
//   console.log(error);
// }

// allMessages.forEach(iterateFunc, errorFunc)

// update a record
// let promisifyUpdate = () => {
//   return new Promise((res, rej) => {
//     res(collection
//       .updateOne(
//         { "_id": ObjectID("5ed76c27a2a8ea15ccbf532b") },
//         {
//           $set: { 'message': 'This message was modified by the object' }
//         }
//       )
//     )
//     rej(err, client.close())

//   })
// }

// let promiseCall = async () => {
//   let result = await (promisifyUpdate())
//   return result
// }

// promiseCall().then(result => {
//   client.close()
// })

// collection.updateMany({ name: 'anon2' }, { $set: { message: 'this user was banned and messages were deleted' } })


// remove a record
// collection.deleteOne({ "_id": ObjectID("5ed76c27a2a8ea15ccbf532c") })
// collection.deleteMany({name: 'anon1'})

//   client.close();
//   console.log("closed the connection to DB")
// });



// const io = require('socket.io')()

// app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
  // res.render(JSON.stringify(allMessages, null, 4))
  // res.send(allMessages)
  // console.log("all messages", messageString)
  client.connect(err => {
    console.log("Connected correctly to DB");
    const collection = client.db("datastore").collection("messages");
    if (err) {
      console.log(err)
    }
    // read all records
    let messageString
    let allMessages = collection.find().toArray( (err, result) => {
      if (err) throw err

      return result
    } )

    // function iterateFunc(doc) {
    //   console.log("im in iterate func", doc)
    //   messageString = JSON.stringify(doc, null, 2)
    // }

    // function errorFunc(error) {
    //   console.log(error);
    // }

    // allMessages.forEach(iterateFunc, errorFunc)


    client.close();
    console.log("closed the connection to DB")
    console.log("message string", allMessages)
    res.json(allMessages)
  });
})

// port
server = app.listen(3000, () => {
  console.log('server is running on port', server.address().port)
})


// // connection listener
// io.on('connection', (socket) => {
//   console.log('New user connected');

// })