//Bibliotheken erstellen:
//Express: Importiert Express, um den Webserver zu erstellen.
//Mongoose: Importiert Mongoose, um mit MongoDB zu kommunizieren.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Instanz von Express erstellen, um später Anfragen zu verarbeiten
const app = express();
//Server auf Port laufen lassen
const PORT = 3001;

//Damit Express JSON versteht
app.use(express.json());
//CORS aktivieren, um Anfragen von alles Ursprüngen zu erlauben
app.use(cors());

//MongoDB Verbindung erstellen
mongoose.connect("mongodb://localhost:27017/rechnungsapp")
.then(()=>console.log("MongoDB verbunden"))
.catch((err)=>console.log("MongoDB-Verbindungsfehler", err));

//test-route (get route)
app.get("/", (req, res) => {
    res.send("Backend läuft")
})

//Server Starten
app.listen(PORT, ()=>{
    console.log(`Server läuft auf http://localhost:${PORT}`);
});