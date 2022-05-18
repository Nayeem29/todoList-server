const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
require('dotenv').config();
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6z5h0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const listCollection = client.db('toDoList').collection('myList');

    app.post('/addList', async (req, res) => {
      const doc = req.body;
      console.log(doc);
      const result = await listCollection.insertOne(doc);
      res.send(result);
    });

    app.get('/myList', async (req, res) => {
      const result = await listCollection.find().toArray();
      res.send(result);
    });
    app.get('/myList/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await listCollection.findOne(query);
      res.send(result);
    });
    app.delete('/myList/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: (ObjectId(id)) };
      console.log(query);
      const result = await listCollection.deleteOne(query);
      res.send(result);
    })

  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('To-Do is working!!');
})

app.listen(port, () => {
  console.log('To-Do server is okay now');
})