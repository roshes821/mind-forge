const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.ATLAS_URI);

async function run() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('MindForgeDB');
    const sessions = db.collection('sessions');

    // GET all sessions
    app.get('/sessions', async (req, res) => {
      const result = await sessions.find().toArray();
      res.send(result);
    });

    // Insert 8 sample sessions
    app.post('/insert-sample-sessions', async (req, res) => {
      const sampleSessions = [
        {
          session_title: 'IELTS Bootcamp',
          description: 'Prepare for your IELTS with expert guidance and mock exams.',
          tutor_name: 'Emily Watson',
          tutor_email: 'emily@mindforge.com',
          reg_fee: 30,
          status: 'Open',
          cover_img: 'https://i.ibb.co/WBncz7M/ielts.jpg',
          reg_start_date: '2025-05-01',
          reg_end_date: '2025-05-15',
          classStart: '2025-05-16',
          classEnd: '2025-06-15',
          session_duration: 20
        },
        {
          session_title: 'Python for Beginners',
          description: 'Start your coding journey with the basics of Python programming.',
          tutor_name: 'John Lee',
          tutor_email: 'john@mindforge.com',
          reg_fee: 20,
          status: 'Open',
          cover_img: 'https://i.ibb.co/VJ6wXkT/python.jpg',
          reg_start_date: '2025-05-03',
          reg_end_date: '2025-05-17',
          classStart: '2025-05-18',
          classEnd: '2025-06-10',
          session_duration: 15
        },
        {
          session_title: 'High School Math Support',
          description: 'Master algebra, geometry, and calculus with expert help.',
          tutor_name: 'Rachel Kim',
          tutor_email: 'rachel@mindforge.com',
          reg_fee: 25,
          status: 'Open',
          cover_img: 'https://i.ibb.co/BgL3ZFc/math.jpg',
          reg_start_date: '2025-05-05',
          reg_end_date: '2025-05-20',
          classStart: '2025-05-21',
          classEnd: '2025-06-30',
          session_duration: 18
        },
        {
          session_title: 'Creative Writing Workshop',
          description: 'Build your writing skills with structured storytelling guidance.',
          tutor_name: 'David Harper',
          tutor_email: 'david@mindforge.com',
          reg_fee: 15,
          status: 'Open',
          cover_img: 'https://i.ibb.co/3F3P6GZ/writing.jpg',
          reg_start_date: '2025-05-07',
          reg_end_date: '2025-05-21',
          classStart: '2025-05-22',
          classEnd: '2025-06-15',
          session_duration: 12
        },
        {
          session_title: 'JavaScript Fundamentals',
          description: 'Understand core JS concepts, from variables to DOM.',
          tutor_name: 'Sarah Brown',
          tutor_email: 'sarah@mindforge.com',
          reg_fee: 35,
          status: 'Open',
          cover_img: 'https://i.ibb.co/mFbLwdK/javascript.jpg',
          reg_start_date: '2025-05-10',
          reg_end_date: '2025-05-25',
          classStart: '2025-05-26',
          classEnd: '2025-06-20',
          session_duration: 16
        },
        {
          session_title: 'Physics Crash Course',
          description: 'Quick revision of key physics topics for high schoolers.',
          tutor_name: 'Tom Evans',
          tutor_email: 'tom@mindforge.com',
          reg_fee: 28,
          status: 'Open',
          cover_img: 'https://i.ibb.co/QYFdsc7/physics.jpg',
          reg_start_date: '2025-05-12',
          reg_end_date: '2025-05-26',
          classStart: '2025-05-27',
          classEnd: '2025-06-15',
          session_duration: 14
        },
        {
          session_title: 'Spoken English Mastery',
          description: 'Boost your fluency and confidence in conversational English.',
          tutor_name: 'Priya Mehta',
          tutor_email: 'priya@mindforge.com',
          reg_fee: 18,
          status: 'Open',
          cover_img: 'https://i.ibb.co/w7tTzmm/english.jpg',
          reg_start_date: '2025-05-13',
          reg_end_date: '2025-05-28',
          classStart: '2025-05-29',
          classEnd: '2025-06-25',
          session_duration: 20
        },
        {
          session_title: 'Introduction to Data Science',
          description: 'Learn how data is analyzed and visualized using Python and tools.',
          tutor_name: 'Carlos Ramirez',
          tutor_email: 'carlos@mindforge.com',
          reg_fee: 40,
          status: 'Open',
          cover_img: 'https://i.ibb.co/fDh8SgS/datascience.jpg',
          reg_start_date: '2025-05-15',
          reg_end_date: '2025-05-30',
          classStart: '2025-06-01',
          classEnd: '2025-07-01',
          session_duration: 24
        }
      ];

      const result = await sessions.insertMany(sampleSessions);
      res.send({ insertedCount: result.insertedCount });
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
