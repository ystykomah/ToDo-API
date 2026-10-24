// ==============================================
// KODE LENGKAP index.js — API DAFTAR TUGAS
// ==============================================

require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();

// ==============================================
// KONFIGURASI
// ==============================================
const PORT = process.env.PORT || 3000;

// Koneksi ke Basis Data (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================================
// RUTE: AMBIL SEMUA TUGAS — GET
// ==============================================
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        t.task_id,
        t.user_id,
        t.category_id,
        t.title,
        t.description,
        t.is_completed,
        t.due_date,
        t.created_at,
        t.updated_at,
        c.category_name
      FROM tasks t
      LEFT JOIN categories c ON t.category_id = c.category_id
      ORDER BY t.created_at DESC
    `);

    res.json({
      message: "Berhasil ambil semua tugas",
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================================
// RUTE: TAMBAH TUGAS BARU — POST
// ==============================================
app.post('/api/tasks', async (req, res) => {
  try {
    const { user_id, category_id, title, description, due_date } = req.body;

    // Validasi data wajib
    if (!user_id || !title) {
      return res.status(400).json({
        error: "Kolom user_id dan title wajib diisi"
      });
    }

    const result = await pool.query(`
      INSERT INTO tasks (user_id, category_id, title, description, due_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [user_id, category_id || null, title, description || null, due_date || null]);

    res.status(201).json({
      message: "Tugas berhasil ditambahkan",
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================================
// RUTE: UBAH DATA TUGAS — PUT
// ==============================================
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category_id, is_completed, due_date } = req.body;

    const result = await pool.query(`
      UPDATE tasks SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        category_id = COALESCE($3, category_id),
        is_completed = COALESCE($4, is_completed),
        due_date = COALESCE($5, due_date),
        updated_at = NOW()
      WHERE task_id = $6
      RETURNING *
    `, [title, description, category_id, is_completed, due_date, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Tugas tidak ditemukan"
      });
    }

    res.json({
      message: "Tugas berhasil diperbarui",
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================================
// RUTE: HAPUS TUGAS — DELETE
// ==============================================
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      DELETE FROM tasks
      WHERE task_id = $1
      RETURNING *
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Tugas tidak ditemukan"
      });
    }

    res.json({
      message: "Tugas berhasil dihapus",
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================================
// RUTE: AMBIL SATU TUGAS BERDASARKAN ID
// ==============================================
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT 
        t.*,
        c.category_name
      FROM tasks t
      LEFT JOIN categories c ON t.category_id = c.category_id
      WHERE t.task_id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Tugas tidak ditemukan"
      });
    }

    res.json({
      message: "Berhasil ambil data tugas",
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================================
// HALAMAN UTAMA
// ==============================================
app.get('/', (req, res) => {
  res.send(`
    <h1>API Daftar Tugas Berjalan 🚀</h1>
    <p>Endpoints tersedia:</p>
    <ul>
      <li>GET /api/tasks — Ambil semua tugas</li>
      <li>GET /api/tasks/:id — Ambil satu tugas</li>
      <li>POST /api/tasks — Tambah tugas baru</li>
      <li>PUT /api/tasks/:id — Ubah tugas</li>
      <li>DELETE /api/tasks/:id — Hapus tugas</li>
    </ul>
  `);
});

// ==============================================
// JALANKAN SERVER
// ==============================================
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

module.exports = app;