import React, { useState } from "react";
import UploadForm from "./UploadForm";
import CustomerList from "./CustomerList";

function App() {
    const [refresh, setRefresh] = useState(false);

    const handleUploadSuccess = () => {
        // Setze den Refresh-Zustand, um die CustomerList neu zu laden
        setRefresh(!refresh);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Rechnungs-App</h1>
            <UploadForm onUploadSuccess={handleUploadSuccess} />
            <CustomerList key={refresh} />
        </div>
    );
}

export default App;
