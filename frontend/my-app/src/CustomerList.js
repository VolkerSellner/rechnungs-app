import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState("");

    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/customers");
            setCustomers(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Fehler beim Abrufen der Kundendaten.");
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (customers.length === 0) {
        return <p>Keine Kundendaten verfügbar.</p>;
    }

    return (
        <table border="1" style={{ margin: "0 auto", textAlign: "left" }}>
            <thead>
            <tr>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>E-Mail</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer, index) => (
                <tr key={index}>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CustomerList;
