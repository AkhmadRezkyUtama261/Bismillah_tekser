// TODO: Definisikan semua jalur (Route) aplikasi kalian disini (GET, POST, PUT, DELETE)
const express = require("express");
const router = express.Router();
const db = require("../config/database");

/* READ */
router.get("/", (req, res) => {
  const sql = `
    SELECT penyewa.id, penyewa.nama_penyewa,
           penyewa.tanggal_pengambilan,
           penyewa.tanggal_pengembalian,
           kamera.merk_kamera, kamera.seri_kamera
    FROM penyewa
    JOIN kamera ON kamera.idkamera = penyewa.idkamera
  `;
  db.query(sql, (err, result) => {
    res.render("index", { data: result });
  });
});

/* CREATE */
router.post("/add", (req, res) => {
  const { nama, merk, seri, ambil, kembali } = req.body;

  db.query(
    "INSERT INTO kamera (merk_kamera, seri_kamera) VALUES (?, ?)",
    [merk, seri],
    (err, result) => {
      if (err) throw err;

      const idkamera = result.insertId;

      db.query(
        `INSERT INTO penyewa
         (nama_penyewa, tanggal_pengambilan, tanggal_pengembalian, idkamera)
         VALUES (?, ?, ?, ?)`,
        [nama, ambil, kembali, idkamera],
        () => res.redirect("/")
      );
    }
  );
});

/* DELETE */
router.get("/delete/:id", (req, res) => {
  db.query("DELETE FROM penyewa WHERE id = ?", [req.params.id], () => {
    res.redirect("/");
  });
});

module.exports = router;
