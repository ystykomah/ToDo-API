const express = require("express");
require("dotenv").config();

const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Halaman utama
app.get("/", (req, res) => {
  res.json({
    message: "To-Do List API berhasil dijalankan"
  });
});

// Tes koneksi database
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS waktu_server"
    );

    res.json({
      message: "Koneksi Supabase berhasil",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("===DETAIL ERROR DATABASE===");
    console.error(error.stack);

    res.status(500).json({
      error: "Koneksi database gagal",
      detail: error.message
    });
  }
});

// Melihat semua tugas
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY task_id ASC"
    );

    res.json({
      message: "Data tugas berhasil diambil",
      data: result.rows
    });
  } catch (error) {
    console.error("===DETAIL ERROR DATABASE===");
    console.error(error.stack);

    res.status(500).json({
      error: "Gagal mengambil data tugas",
      detail: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
