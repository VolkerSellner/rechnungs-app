//Importieren der Module
//useState: um Zustand in der Komponene zu speichern
//useEffect: um Code auszuführen, wenn die Komponente geladen wird
import React, {useState, useEffect} from "react";
//axios: Bib, um HTTP Anfragen zu senden
import axios from "axios";
function App(){
  //Zustand für die Nachricht erstellen
//message: Enthält die Nachricht vom Backend
//setMessage: Funktion um die message zu ändern
  const[message, setMessage] = useState("");
  //HTTP Anfrage an das Backend senden
  useEffect(() => {
    axios.get("http://localhost:3001/")
        .then((response)=>setMessage(response.data))
        .catch((error)=>console.error("Fehler:", error));
  }, []);

  return (
      <div>
        <h1>React Frontend</h1>
        <p>Nachricht vom Backend: {message}</p>
      </div>
  );
}


export default App;