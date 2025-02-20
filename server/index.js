const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
// scic-job-task
// qMF04fnw8e4kU4td


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://scic-job-task:qMF04fnw8e4kU4td@cluster0.isdx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {

    const db = client.db("scic-job-task");
    const userCollection = db.collection("users");

    app.post('/users/:email', async(req,res)=>{
      const email = req.params.email;
      const query = {email}
        const user = req.body;

        const isExist = await userCollection.findOne(query)
        if(isExist){
          return res.send(isExist)
        }
        const result = await userCollection.insertOne(user)
        res.send(result)
    })


    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("scic task was never end....");
  });
  
  app.listen(port, () => {
    console.log(`scic task running on the port : ${port}`);
  });