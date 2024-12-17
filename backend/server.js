//Bibliotheken erstellen:
//Express: Importiert Express, um den Webserver zu erstellen.
//Mongoose: Importiert Mongoose, um mit MongoDB zu kommunizieren.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const XLSX = require("xlsx")

//Instanz von Express erstellen, um später Anfragen zu verarbeiten
const app = express();
//Server auf Port laufen lassen
const PORT = 3001;

//Damit Express JSON versteht
app.use(express.json());
//CORS aktivieren, um Anfragen von alles Ursprüngen zu erlauben
app.use(cors());
//fileUpload
app.use(fileUpload());


//MongoDB Verbindung erstellen
mongoose.connect("mongodb://mongodb:27017/rechnungsapp")
.then(()=>console.log("MongoDB verbunden"))
.catch((err)=>console.log("MongoDB-Verbindungsfehler", err));

// Datenbank-Modell für Kunden
const Customer = mongoose.model("Customer", {
    firstName: String,
    lastName: String,
    email: String,
});

// Post: API-Route zum Hochladen und Verarbeiten der Excel-Datei
app.post("/import-excel", async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).send("Keine Datei hochgeladen.");
        }

        // Excel-Datei verarbeiten
        const excelFile = req.files.file;
        const workbook = XLSX.read(excelFile.data, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Daten in MongoDB speichern
        const customers = await Customer.insertMany(data);
        res.status(200).json({ message: "Daten erfolgreich importiert", customers });
    } catch (err) {
        console.error(err);
        res.status(500).send("Fehler beim Verarbeiten der Datei.");
    }
});

// Route zum Abrufen der Kundendaten
app.get("/customers", async (req, res) => {
    try {
        const customers = await Customer.find(); // Alle Kunden aus der Datenbank abrufen
        res.status(200).json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).send("Fehler beim Abrufen der Daten.");
    }
});

//test-route (get route)
app.get("/", (req, res) => {
    res.send("Backend läuft")
})

//Server Starten
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server läuft auf http://0.0.0.0:${PORT}`);
});
