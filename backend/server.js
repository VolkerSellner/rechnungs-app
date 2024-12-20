// Import der Bibliotheken
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const XLSX = require("xlsx");

// Express-App erstellen
const app = express();
const PORT = 3001; // Port des Servers

// Middleware
app.use(express.json()); // JSON-Daten verarbeiten
app.use(cors()); // CORS aktivieren, um Anfragen von verschiedenen Ursprüngen zuzulassen
app.use(fileUpload()); // Hochladen von Dateien ermöglichen

// Verbindung zur MongoDB herstellen
mongoose
    .connect("mongodb://localhost:27017/rechnungsapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB verbunden"))
    .catch((err) => console.error("MongoDB-Verbindungsfehler:", err));

// Datenbankmodell (Schema) für Kunden erstellen
const Customer = mongoose.model("Customer", {
    firstName: String,
    lastName: String,
    email: String,
});

// Route: Excel-Datei hochladen und Daten verarbeiten
app.post("/import-excel", async (req, res) => {
    try {
        // Prüfen, ob eine Datei hochgeladen wurde
        if (!req.files || !req.files.file) {
            return res.status(400).send("Keine Datei hochgeladen.");
        }

        // Excel-Datei verarbeiten
        const excelFile = req.files.file; // Datei aus der Anfrage
        const workbook = XLSX.read(excelFile.data, { type: "buffer" }); // Excel lesen
        const sheetName = workbook.SheetNames[0]; // Name des ersten Arbeitsblatts
        const sheet = workbook.Sheets[sheetName]; // Arbeitsblatt abrufen
        const data = XLSX.utils.sheet_to_json(sheet); // Daten in JSON umwandeln

        // Daten in MongoDB speichern
        const customers = await Customer.insertMany(data);

        // Erfolgsmeldung zurückgeben
        res.status(200).json({ message: "Daten erfolgreich importiert", customers });
    } catch (err) {
        console.error("Fehler beim Verarbeiten der Datei:", err);
        res.status(500).send("Fehler beim Verarbeiten der Datei.");
    }
});

// Route: Kundendaten abrufen
app.get("/customers", async (req, res) => {
    try {
        const customers = await Customer.find(); // Alle Kunden aus der Datenbank abrufen
        res.status(200).json(customers);
    } catch (err) {
        console.error("Fehler beim Abrufen der Daten:", err);
        res.status(500).send("Fehler beim Abrufen der Daten.");
    }
});

// Test-Route: Serverstatus prüfen
app.get("/", (req, res) => {
    res.send("Backend läuft");
});

// Server starten
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server läuft auf http://0.0.0.0:${PORT}`);
});
