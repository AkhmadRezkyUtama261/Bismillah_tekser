CREATE DATABASE IF NOT EXISTS sewa_kamera;
USE sewa_kamera;

CREATE TABLE kamera (
    idkamera INT AUTO_INCREMENT PRIMARY KEY,
    merk_kamera VARCHAR(100),
    seri_kamera VARCHAR(100)
);

CREATE TABLE penyewa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_penyewa VARCHAR(100),
    tanggal_pengambilan DATE,
    tanggal_pengembalian DATE,
    idkamera INT UNIQUE,
    FOREIGN KEY (idkamera) REFERENCES kamera(idkamera)
);

-- Membuat user baru dengan password
CREATE USER 'tekser_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password123';

-- Memberikan Hak Akses CRUD (Create, Read, Update, Delete)
GRANT SELECT, INSERT, UPDATE, DELETE ON sewa_kamera.* TO 'tekser_user'@'localhost';