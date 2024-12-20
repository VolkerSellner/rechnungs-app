import React, { useState } from "react";
import axios from "axios";

function App() {
    const [file, setFile] = useState(null); // Zustand für die ausgewählte Datei
    const [message, setMessage] = useState(""); // Nachricht nach dem Upload
    const [error, setError] = useState(""); // Fehlernachricht

    // Funktion, um die Datei im Zustand zu speichern
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Die erste Datei im Input-Feld speichern
    };

    // Funktion, um die Datei hochzuladen
    const handleFileUpload = async (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        if (!file) {
            setError("Bitte wählen Sie eine Datei aus.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:3001/import-excel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage("Datei erfolgreich hochgeladen!"); // Erfolgsmeldung
            setError(""); // Fehler zurücksetzen
        } catch (err) {
            console.error(err);
            setError("Fehler beim Hochladen der Datei.");
            setMessage(""); // Erfolgsmeldung zurücksetzen
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Willkommen! Laden Sie Ihre Rechnung hoch</h1>
            <form onSubmit={handleFileUpload}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls" // Nur Excel-Dateien erlauben
                    style={{ margin: "10px 0" }}
                />
                <button type="submit">Hochladen...</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default App;
