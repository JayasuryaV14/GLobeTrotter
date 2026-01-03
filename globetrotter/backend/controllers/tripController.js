const db = require("../config/db");

const createTrip = (req, res) => {
  console.log("REQ BODY:", req.body);   // 🔍 DEBUG LINE

  const { user_id, name, start_date, end_date, description } = req.body;

  const sql =
    "INSERT INTO trips (user_id, name, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [user_id, name, start_date, end_date, description], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);   // 🔍 DEBUG LINE
      return res.status(500).json({ error: "Database error" });
    }

    console.log("DB RESULT:", result);   // 🔍 DEBUG LINE

    res.json({
      message: "Trip created successfully",
      tripId: result.insertId
    });
  });
};

module.exports = { createTrip };
