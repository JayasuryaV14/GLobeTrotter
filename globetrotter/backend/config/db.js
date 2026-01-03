const mysql = require("mysql2");

// Create connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root@",
  database: process.env.DB_NAME || "globetrotter",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
    console.error("⚠️  Please make sure MySQL is running and the database exists.");
    console.error("💡 Run: mysql -u root -p < backend/database/schema.sql");
    // Don't throw - let the app start, connection will retry on first query
  } else {
    console.log("✅ Database Connected Successfully");
    connection.release();
  }
});

// Export the pool for promise-based queries (for new code)
const dbPromise = pool.promise();

// Export query function for callback-based queries (backward compatibility)
const db = {
  query: (sql, params, callback) => {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    pool.query(sql, params, callback);
  }
};

module.exports = db;
module.exports.promise = dbPromise;
