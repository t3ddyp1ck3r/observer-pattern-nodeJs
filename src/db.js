const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./notifications.db");

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    );
    console.log("Database initialized with notifications table.");
});

module.exports = db;
