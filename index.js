// import { ObjectId } from "mongodb";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId  } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "John", age: 25, email: "john@gmail.com" },
  { id: 2, name: "Jane", age: 30, email: "jane@gmail.com" },
  { id: 3, name: "Bob", age: 35, email: "bob@gmail.com" },
  { id: 4, name: "Alice", age: 40, email: "alice@gmail.com" },
  { id: 5, name: "Charlie", age: 45, email: "charlie@gmail.com" },
  {},
];

app.get("/", (req, res) => {
  res.send("world class recipes is showing");
});

app.get("/users", (req, res) => {
  res.send(users);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qwpvc8e.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const recipeCollection = client.db("recipesDb").collection("recipe");

     
  app.get('/recipe',async(req,res) => {
    const cursor =recipeCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  })

   
  app.get('/recipe/:id',async(req,res) => {
    const id = req.params.id;
    const query ={_id : ObjectId(id)};
    const result = await recipeCollection.findOne(query);
    res.send(result);
  })




    app.post("/recipe", async (req, res) => {
      const newService = req.body;
      console.log(newService);
      const result = await recipeCollection.insertOne(newService);
      res.send(result);
    });


    app.delete('/recipe/:id',async(req,res)=> {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await recipeCollection.deleteOne(query);
      res.send(result);
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

console.log(process.env.DB_USER);





app.listen(port, () => {
  console.log(`sever is running on port ${port}`);
});





