const express = require("express");
const Observable = require("../Observable");
const EmailService = require("../observers/EmailService");
const LoggingService = require("../observers/LoggingService");
const SMSService = require("../observers/SMSService");
const db = require("../db"); // Import SQLite database

const router = express.Router();
const subject = new Observable();

// Initialize observers
const emailService = new EmailService();
const loggingService = new LoggingService();
const smsService = new SMSService();

// Subscribe observers
subject.subscribe(emailService);
subject.subscribe(loggingService);
subject.subscribe(smsService);

// Debugging log: After observers are subscribed
console.log("Observers have been subscribed:");
console.log("Number of observers:", subject.observers.length);

// POST: Trigger a notification and save to the database
router.post("/notify", (req, res) => {
    const { message } = req.body;
    if (!message) {
        console.log("Error: Message is missing in the request body");
        return res.status(400).json({ error: "Message is required" });
    }

    console.log("Notification payload:", { message });

    // Save the notification in the database
    db.run(
        "INSERT INTO notifications (message) VALUES (?)",
        [message],
        (err) => {
            if (err) {
                console.log("Error saving notification:", err);
                return res.status(500).json({ error: "Failed to save notification" });
            }

            console.log("Notification saved to database:", message);

            // Notify all observers
            subject.notify({ message });

            res.status(200).json({ status: "Notifications sent successfully" });
        }
    );
});

// GET: Retrieve notification history from the database
router.get("/history", (req, res) => {
    db.all("SELECT * FROM notifications", [], (err, rows) => {
        if (err) {
            console.log("Error retrieving notifications:", err);
            return res.status(500).json({ error: "Failed to retrieve notifications" });
        }

        res.status(200).json(rows);
    });
});

module.exports = router;
