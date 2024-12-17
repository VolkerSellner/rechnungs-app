import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [customers, setCustomers] = useState([]); // Zustand für Kundendaten
    const [error, setError] = useState("");

    // Funktion, um Kundendaten vom Backend zu holen
    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/customers");
            setCustomers(response.data); // Daten in den Zustand speichern
        } catch (err) {
            setError("Fehler beim Laden der Kundendaten.");
            console.error(err);
        }
    };

    // useEffect: Lädt Kundendaten, sobald die Komponente geladen wird
    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div>
            <h1>Kundenliste</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {customers.map((customer, index) => (
                    <li key={index}>
                        {customer.firstName} {customer.lastName} - {customer.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
