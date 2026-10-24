# Dokumentasi Tugas Akhir Learning Labs: To-Do List Backend API

## 1. Deskripsi Project
**To-Do List Backend API** adalah layanan REST API yang dibangun menggunakan **Node.js** dan **Express.js** serta terhubung dengan database **PostgreSQL** yang di-host pada platform **Supabase**. API ini menyediakan fungsionalitas manajemen tugas (CRUD) untuk pengguna, lengkap dengan kategori, label/tag, serta profil pengguna.

---

## 2. Informasi Deployment & Repository
- **URL Deployment (Vercel)** : `https://to-do-api-eight-lyart.vercel.app`
- **Repository GitHub**       : `https://github.com/ystykomah/ToDo-API`
- **Database Host**           : Supabase (PostgreSQL Cloud)

---

## 3. Skema Database & ERD

Database dirancang menggunakan **PostgreSQL** dan terdiri dari **6 tabel terelasi** untuk mendukung fungsionalitas aplikasi:

1. **`users`** : Menyimpan data utama pengguna (primary key: `user_id`).
2. **`user_profiles`** : Menyimpan detail profil pengguna dengan relasi `1:1` ke `users` (foreign key: `user_id`).
3. **`categories`** : Menyimpan kategori tugas dengan relasi `1:N` ke `tasks` (primary key: `category_id`).
4. **`tasks`** : Tabel utama menyimpan tugas dengan relasi `N:1` ke `users` dan `categories` (primary key: `task_id`).
5. **`tags`** : Menyimpan label/tag untuk tugas (primary key: `tag_id`).
6. **`task_tags`** : Junction table untuk mendukung relasi `N:N` antara `tasks` dan `tags`.

<img width="1521" height="690" alt="Cuplikan layar 2026-10-21 091637" src="https://github.com/user-attachments/assets/cda84a46-8750-43f7-8f6c-d303b40e8297" />

---

## 4. Dokumentasi Endpoint API & Hasil Pengujian

Berikut adalah rincian panggilan endpoint yang tersedia pada REST API ini beserta hasil pengujiannya menggunakan **Thunder Client**:

### A. Root / Health Check
- **Method**       : `GET`
- **URL**          : `https://to-do-api-eight-lyart.vercel.app/`
- **Deskripsi**    : Memeriksa status keberjalanan server API.
- **Response (200 OK)** :
  "API Daftar Tugas Berjalan 🚀"
<img width="1917" height="1078" alt="Cuplikan layar 2026-10-24 113034" src="https://github.com/user-attachments/assets/c9190451-2099-4eaf-a994-eee12f21a72e" />

### B. Get All Tasks
- **Method**       : `GET`
- **URL**          : `https://to-do-api-eight-lyart.vercel.app/api/tasks`
- **Deskripsi**    : Mengambil seluruh daftar tugas dari database.
- **Response (200 OK)** :
{
  "message": "Berhasil ambil semua tugas",
  "data": [
    {
      "task_id": 7,
      "user_id": 1,
      "category_id": null,
      "title": "Belajar Backend Express & Vercel",
      "description": null,
      "is_completed": false,
      "due_date": null,
      "created_at": "2026-10-24T04:42:53.682Z",
      "updated_at": "2026-10-24T04:42:53.682Z",
      "category_name": null
    },
    {
      "task_id": 6,
      "user_id": 1,
      "category_id": null,
      "title": "Belajar Backend Express & Vercel (Updated)",
      "description": null,
      "is_completed": false,
      "due_date": null,
      "created_at": "2026-10-24T04:21:09.516Z",
      "updated_at": "2026-10-24T04:41:03.325Z",
      "category_name": null
    },
    {
      "task_id": 5,
      "user_id": 1,
      "category_id": null,
      "title": "Belajar Backend Express & Vercel",
      "description": null,
      "is_completed": false,
      "due_date": null,
      "created_at": "2026-10-23T16:54:06.476Z",
      "updated_at": "2026-10-23T16:54:06.476Z",
      "category_name": null
    },
    {
      "task_id": 4,
      "user_id": 1,
      "category_id": null,
      "title": "Belajar Backend Express & Vercel",
      "description": null,
      "is_completed": false,
      "due_date": null,
      "created_at": "2026-10-23T16:53:42.173Z",
      "updated_at": "2026-10-23T16:53:42.173Z",
      "category_name": null
    },
    {
      "task_id": 3,
      "user_id": 1,
      "category_id": 1,
      "title": "Selesaikan Laporan Tugas Akhir",
      "description": "Melengkapi semua bukti pengujian API",
      "is_completed": false,
      "due_date": "2026-10-25T23:59:00.000Z",
      "created_at": "2026-10-23T16:44:36.412Z",
      "updated_at": "2026-10-23T16:44:36.412Z",
      "category_name": "Pekerjaan"
    },
    {
      "task_id": 2,
      "user_id": 1,
      "category_id": 2,
      "title": "Beli Bahan Makanan",
      "description": "Membeli buah dan sayur untuk mingguan",
      "is_completed": true,
      "due_date": null,
      "created_at": "2026-10-20T05:17:22.723Z",
      "updated_at": "2026-10-20T05:17:22.723Z",
      "category_name": "Pribadi"
    }
  ]
}
<img width="1917" height="1078" alt="Cuplikan layar 2026-10-24 114140" src="https://github.com/user-attachments/assets/09dff7db-1930-451e-8caf-846018286ea9" />

### C. Create New Task
- **Method**       : `POST`
- **URL**          : `https://to-do-api-eight-lyart.vercel.app/api/tasks`
- **Deskripsi**    : Membuat/Menambah tugas baru
- **Request Body (JSON)** :
{
  "user_id": 1,
  "title": "Belajar Backend Express & Vercel",
  "completed": false
}
- **Response (201 Created)** :
{
  "message": "Tugas berhasil ditambahkan",
  "data": {
    "task_id": 7,
    "user_id": 1,
    "category_id": null,
    "title": "Belajar Backend Express & Vercel",
    "description": null,
    "is_completed": false,
    "due_date": null,
    "created_at": "2026-10-24T04:42:53.682Z",
    "updated_at": "2026-10-24T04:42:53.682Z"
  }
}
<img width="1917" height="1078" alt="Cuplikan layar 2026-10-24 114404" src="https://github.com/user-attachments/assets/218b794b-9a6c-4ee6-9dd3-91870478ee07" />

### D. Update Task
- **Method**       : `PUT`
- **URL**          : `https://to-do-api-eight-lyart.vercel.app/api/tasks/6`
- **Deskripsi**    : Memperbarui data tugas atau mengubah judul
- **Request Body (JSON)** :
{
  "title": "Belajar Backend Express & Vercel (Updated)",
  "completed": true
}
-**Response (200 OK)** :
  {
  "message": "Tugas berhasil diperbarui",
  "data": {
    "task_id": 6,
    "user_id": 1,
    "category_id": null,
    "title": "Belajar Backend Express & Vercel (Updated)",
    "description": null,
    "is_completed": false,
    "due_date": null,
    "created_at": "2026-10-24T04:21:09.516Z",
    "updated_at": "2026-10-24T04:50:47.075Z"
  }
}
<img width="1917" height="1078" alt="Cuplikan layar 2026-10-24 114116" src="https://github.com/user-attachments/assets/b0f8ffb3-c75a-4c63-86c9-f52dfba00028" />

### E. Delete Task
- **Method**       : `DELETE`
- **URL**          : `https://to-do-api-eight-lyart.vercel.app/api/tasks/6`
- **Deskripsi**    : Menghapus tugas berdasarkan task_id.
- **Response (200 OK)** :
{
  "message": "Tugas berhasil dihapus",
  "data": {
    "task_id": 6,
    "user_id": 1,
    "category_id": null,
    "title": "Belajar Backend Express & Vercel (Updated)",
    "description": null,
    "is_completed": false,
    "due_date": null,
    "created_at": "2026-10-24T04:21:09.516Z",
    "updated_at": "2026-10-24T04:51:28.078Z"
  }
}
<img width="1917" height="1078" alt="Cuplikan layar 2026-10-24 115145" src="https://github.com/user-attachments/assets/20755b1a-ca37-4018-9288-6f7f4066667a" />

---
