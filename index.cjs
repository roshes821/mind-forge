const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI); // No options needed

async function run() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('MindForgeDB');

    const sessions = db.collection('sessions');
    const tutors = db.collection('tutors');

    app.get('/sessions', async (req, res) => {
      console.log("➡️ /sessions hit");
      const result = await sessions.find().toArray();
      res.send(result);
    });

    app.get('/tutors', async (req, res) => {
      try {
        console.log("➡️ /tutors hit");
        const result = await tutors.find().toArray();
        res.send(result);
      } catch (err) {
        console.error("❌ Failed to fetch tutors:", err);
        res.status(500).send({ error: "Failed to fetch tutors" });
      }
    });

    app.post('/tutors/add', async (req, res) => {
      try {
        const newTutor = req.body;
        const result = await tutors.insertOne(newTutor);
        res.status(201).send(result);
      } catch (err) {
        console.error("❌ Failed to insert tutor:", err);
        res.status(500).send({ error: "Failed to add tutor" });
      }
    });

  } catch (err) {
    console.error('❌ Error connecting to DB:', err);
  }
}
run();

app.get('/', (req, res) => {
  res.send('🎉 MindForge backend is running...');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
