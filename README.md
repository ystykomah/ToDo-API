# Dokumentasi Tugas Akhir Learning Labs: To-Do List Backend API

## 1. Deskripsi Project
**To-Do List Backend API** adalah layanan REST API yang dibangun menggunakan **Node.js** dan **Express.js** serta terhubung dengan database **PostgreSQL** yang di-host pada platform **Supabase**. API ini menyediakan fungsionalitas manajemen tugas (CRUD) untuk pengguna, lengkap dengan kategori, label/tag, serta profil pengguna.

---

## 2. Informasi Deployment & Repository
* **URL Deployment (Vercel)** : `https://to-do-api-eight-lyart.vercel.app`
* **Repository GitHub**       : `https://github.com/ystykomah/ToDo-API`
* **Database Host**           : Supabase (PostgreSQL Cloud)

---

## 3. Skema Database & ERD

Database dirancang menggunakan **PostgreSQL** dan terdiri dari **6 tabel terelasi** untuk mendukung fungsionalitas aplikasi:

1. **`users`** : Menyimpan data utama pengguna (primary key: `user_id`).
2. **`user_profiles`** : Menyimpan detail profil pengguna dengan relasi `1:1` ke `users` (foreign key: `user_id`).
3. **`categories`** : Menyimpan kategori tugas dengan relasi `1:N` ke `tasks` (primary key: `category_id`).
4. **`tasks`** : Tabel utama menyimpan tugas dengan relasi `N:1` ke `users` dan `categories` (primary key: `task_id`).
5. **`tags`** : Menyimpan label/tag untuk tugas (primary key: `tag_id`).
6. **`task_tags`** : Junction table untuk mendukung relasi `N:N` antara `tasks` dan `tags`.

### Diagram Relasi Database (ERD)
<img width="1521" height="690" alt="Cuplikan layar 2026-10-21 091637" src="https://github.com/user-attachments/assets/f4754460-37cc-4aac-825c-af9c816a782e" />

## 4. Dokumentasi Endpoint API

Berikut adalah rincian panggilan endpoint yang tersedia pada REST API ini:

## 4. Dokumentasi Endpoint API
Berikut adalah rincian panggilan endpoint yang tersedia pada REST API ini:

### A. Root / Health Check
- **Method**       : `GET`
- **URL**          : `https://to-do-api-eight-lyart.vercel.app/`
- **Deskripsi**    : Memeriksa status keberjalanan server API.
- **Response Sukses (200 OK)** :
  ```json
  "API Daftar Tugas Berjalan 🚀"
<img width="1917" height="1062" alt="Cuplikan layar 2026-10-23 234407" src="https://github.com/user-attachments/assets/29b5abc4-052a-4c39-a87d-6cb91185519a" />

### B. Ambil Semua Tugas (GET)
-**Method**       : 'GET'
-**URL**          : 'https://to-do-api-eight-lyart.vercel.app/'
-**Deskripsi**     : Mengambil seluruh daftar tugas dari database PostgresSQL beserta nama kategorinya.
-**Response Sukses (200 OK)** :

<img width="1917" height="1078" alt="Cuplikan layar 2026-10-23 235807" src="https://github.com/user-attachments/assets/9b5d6a79-7667-4406-8d55-8b1347b44df9" />
<img width="1913" height="1078" alt="Cuplikan layar 2026-10-23 235630" src="https://github.com/user-attachments/assets/c9c44284-7fe7-4d4f-9438-bf939ad54472" />
<img width="1917" height="1077" alt="Cuplikan layar 2026-10-23 235417" src="https://github.com/user-attachments/assets/2d1c0c2d-cdd8-408a-83f2-8d6787591e62" />

