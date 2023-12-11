const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://adetona67:tona1234@books.jhca3zt.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(express.json());

app
  .route("/books")
  .get(async (req, res) => {
    try {
      const db = client.db("BookDatabase"); // Replace with your database name
      const booksCollection = db.collection("books"); // Replace with your collection name

      // Retrieve all documents from the collection
      const allBooks = await booksCollection.find({}).toArray();

      // Send the array of documents as a response
      res.json(allBooks);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching Data");
    }
  })
  .post(async (req, res) => {
    try {
      client.connect();
      const db = client.db("BookDatabase");
      const bookCollection = db.collection("books");
      const newBook = req.body.book;
      // console.log(req.body);
      console.log(newBook);
      const result = await bookCollection.insertOne({
        _id: Math.random(),
        book: newBook,
      });
      console.log(result);
      res.status(201).json({ message: "Book added" });
    } catch (e) {
      console.log(e);
    }
  })
  .delete(async (req, res) => {
    try {
      const db = client.db("BookDatabase"); // Replace with your database name
      const booksCollection = db.collection("books"); // Replace with your collection name

      const deletionResult = await booksCollection.deleteMany({});

      console.log(deletionResult);

      res.send("All documents deleted from the collection");
    } catch (error) {
      console.error("Error deleting documents:", error);
      res.status(500).send("Error deleting documents");
    }
  });

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
