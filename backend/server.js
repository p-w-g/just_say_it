require('dotenv').config()
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID

app.use(express.json())



// client.connect(err => {
//   console.log("Connected correctly to DB");
//   const collection = client.db("datastore").collection("messages");

//   // perform actions on the collection object

//   // // add a record
//   // collection.insertOne({
//   //   name: 'anon', message: 'lorem ipsum dolor sit amet'
//   // })

//   // collection.insertMany([
//   //   {
//   //     name: 'anon1',
//   //     message: 'lorem ipsum dolor sit amet'
//   //   },
//   //   {
//   //     name: 'anon2',
//   //     message: 'lorem ipsum dolor sit amet'
//   //   },
//   //   {
//   //     name: 'anon3',
//   //     message: 'lorem ipsum dolor sit amet'
//   //   },
//   //   {
//   //     name: 'anon1',
//   //     message: 'lorem ipsum dolor sit amet'
//   //   }])


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

//   // collection.updateMany({ name: 'anon2' }, { $set: { message: 'this user was banned and messages were deleted' } })


//   // remove a record
//   // collection.deleteOne({ "_id": ObjectID("5ed76c27a2a8ea15ccbf532c") })
//   // collection.deleteMany({name: 'anon1'})

//   client.close();
//   console.log("closed the connection to DB")
//  console.log("after loop", data);
// });


// routes
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

// port
server = app.listen(8080, () => {
  console.log('server is running on port', server.address().port)
})


// // connection listener
// io.on('connection', (socket) => {
//   console.log('New user connected');
// })
