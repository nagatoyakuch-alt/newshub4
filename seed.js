require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function seed() {
  try {
    await client.connect();
    const db = client.db("newshub");

    const articles = [
      {
        title: "Nova tecnologia revoluciona o mundo",
        content: "Lorem ipsum dolor sit amet...",
        category: "Tecnologia",
        image: "https://via.placeholder.com/600x300",
        video: "",
        createdAt: new Date()
      },
      {
        title: "Time de futebol conquista campeonato",
        content: "Lorem ipsum dolor sit amet...",
        category: "Esportes",
        image: "https://via.placeholder.com/600x300",
        video: "",
        createdAt: new Date()
      }
    ];

    await db.collection("articles").insertMany(articles);
    console.log("Banco de dados populado com sucesso!");
  } finally {
    await client.close();
  }
}

seed().catch(console.error);