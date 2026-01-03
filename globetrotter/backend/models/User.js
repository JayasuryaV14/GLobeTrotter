const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async create(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] || null);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT id, name, email, profile_photo, created_at FROM users WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] || null);
      });
    });
  }

  static async updateProfile(id, updateData) {
    const { name, profile_photo } = updateData;
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET name = ?, profile_photo = ? WHERE id = ?";
      db.query(sql, [name, profile_photo, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;

