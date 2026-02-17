require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

client.connect().then(() => {
  db = client.db("newshub");
  console.log("MongoDB conectado");
});

// Rotas de artigos
app.get("/api/articles", async (req, res) => {
  const articles = await db.collection("articles").find({}).sort({ createdAt: -1 }).toArray();
  res.json(articles);
});

app.get("/api/articles/:id", async (req, res) => {
  const article = await db.collection("articles").findOne({ _id: new ObjectId(req.params.id) });
  res.json(article);
});

// Rotas de comentários
app.get("/api/comments/:articleId", async (req, res) => {
  const comments = await db.collection("comments").find({ articleId: req.params.articleId }).sort({ createdAt: -1 }).toArray();
  res.json(comments);
});

app.post("/api/comments", async (req, res) => {
  const { articleId, name, message } = req.body;
  await db.collection("comments").insertOne({
    articleId,
    name,
    message,
    createdAt: new Date()
  });
  res.json({ success: true });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));