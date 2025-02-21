const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// scic-job-task
// qMF04fnw8e4kU4td

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://scic-job-task:qMF04fnw8e4kU4td@cluster0.isdx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    const db = client.db("scic-job-task");
    const userCollection = db.collection("users");
    const taskCollection = db.collection("task");

    app.post("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = req.body;

      const isExist = await userCollection.findOne(query);
      if (isExist) {
        return res.send(isExist);
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/tasks", async (req, res) => {
     
       const result = await taskCollection.find().toArray();
      
      res.send(result);
    });

    app.post("/add-tasks", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    app.put("/tasks/reorder", async (req, res) => {
      const { tasks } = req.body;

      console.log("Received reorder request with tasks:", tasks);

      try {
        // Update each task's order and category in the database
        for (const task of tasks) {
          console.log("Updating task:", task);

          const updateResult = await taskCollection.updateOne(
            { _id: new ObjectId(task._id) }, 
            { $set: { order: parseInt(task.order), category: task.category } } 
          );

          console.log("Update result for task:", updateResult);

          // Check if the task was updated
          if (updateResult.matchedCount === 0) {
            console.error("Task not found:", task._id);
          }
        }

        res.status(200).json({ message: "Tasks reordered successfully" });
      } catch (error) {
        console.error("Error reordering tasks:", error);
        res.status(500).json({ message: "Error reordering tasks", error });
      }
    });

    app.get("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const task = await taskCollection.findOne({ _id: new ObjectId(id) });
      if (!task) {
        return res.status(404).send("Task not found");
      }
      res.send(task);
    });

    // Update task by ID
    app.patch("/task/:id", async (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
   
        const result = await taskCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { title, description } }
        );
        res.send(result);
    
    });

    // Delete Task by ID
    app.delete("/tasks/:id", async (req, res) => {
      const { id } = req.params;

      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
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

app.get("/", (req, res) => {
  res.send("scic task was never end....");
});

app.listen(port, () => {
  console.log(`scic task running on the port : ${port}`);
});
