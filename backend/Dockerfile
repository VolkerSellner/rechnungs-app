#Basis-Image
FROM node:18

#Arbeitsverzeichnis im Container erstellen
WORKDIR /usr/src/app

#kopieren der Dateinen package.json und den Code ins Containerverzeichnis
COPY package*.json ./

#installieren der Abhängigkeiten
RUN npm install

#restlichen Backend code kopieren
COPY . .

#Ports festlegen
EXPOSE 3001

#Startbefehl dür das Backend
CMD ["node", "server.js"]

