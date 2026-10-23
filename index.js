require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'ADA' : 'TIDAK ADA / KOSONG');

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // ⚠️ P BESAR — ini kuncinya!

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/', (req, res) => {
  res.send('API To-Do List Berjalan 🚀');
});

// Ambil semua tugas
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY task_id');
    res.status(200).json({ 
      message: 'Berhasil ambil semua tugas',
      data: result.rows 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Berjalan di port ${PORT}`));

module.exports = app;