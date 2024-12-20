import React, { useState } from "react";
import axios from "axios";

function UploadForm({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();

        if (!file) {
            setError("Bitte wählen Sie eine Datei aus.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:3001/import-excel", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("Datei erfolgreich hochgeladen!");
            setError("");
            onUploadSuccess(); // Informiere die Elternkomponente über den erfolgreichen Upload
        } catch (err) {
            console.error(err);
            setError("Fehler beim Hochladen der Datei.");
            setMessage("");
        }
    };

    return (
        <div>
            <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
                <button type="submit">Hochladen</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default UploadForm;
