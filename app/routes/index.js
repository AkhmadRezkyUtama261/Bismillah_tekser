const express = require("express");
const router = express.Router();
const db = require("../config/database");

/* READ */
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT penyewa.id, penyewa.nama_penyewa,
             penyewa.tanggal_pengambilan,
             penyewa.tanggal_pengembalian,
             kamera.merk_kamera, kamera.seri_kamera
      FROM penyewa
      JOIN kamera ON kamera.idkamera = penyewa.idkamera
    `;

    const [rows] = await (await db).query(sql);
    res.render("index", { data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

/* CREATE */
router.post("/add", async (req, res) => {
  try {
    const { nama, merk, seri, ambil, kembali } = req.body;
    const conn = await db;

    const [kameraResult] = await conn.query(
      "INSERT INTO kamera (merk_kamera, seri_kamera) VALUES (?, ?)",
      [merk, seri]
    );

    const idkamera = kameraResult.insertId;

    await conn.query(
      `INSERT INTO penyewa
       (nama_penyewa, tanggal_pengambilan, tanggal_pengembalian, idkamera)
       VALUES (?, ?, ?, ?)`,
      [nama, ambil, kembali, idkamera]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Insert failed");
  }
});

/* DELETE */
router.get("/delete/:id", async (req, res) => {
  try {
    const conn = await db;
    await conn.query("DELETE FROM penyewa WHERE id = ?", [req.params.id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Delete failed");
  }
});

module.exports = router;
