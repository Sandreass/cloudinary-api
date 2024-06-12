# Backend Mit Node.js und Cloudinary Erstellen (Teil 1)

## Einfache API mit Node.js erstellen (Level 1)

**Schritt 1: Datei-Struktur erstellen**

- Erstelle ein **MUTTER-Ordner** für das Projekt mit der Name `cloudinary-fullstack`
- Erstelle ein neues Verzeichnis für das Projekt in deinem MUTTER-ordner mit der Name `cloudinary-api`
- Navigiere in das Verzeichnis und erstelle folgende:
  - `server.js` - Hauptdatei
  - `models` - Ordner für Datenbankmodelle
  - `routes` - Ordner für Routen
  - `controllers` - Ordner für Controller
  - `database` - Ordner für Datenbankverbindung
  - `.env` - Datei für Umgebungsvariablen
  - `.gitignore` - Datei für Git-ignorierte Dateien
  - `package.json` - Datei für NPM-Pakete

**Schritt 2: Projekt initialisieren**

- Füge folgenden Code in die `package.json`-Datei ein:
  ```json
  {
    "name": "cloudinary-api",
    "version": "1.0.0",
    "description": "Simple API with Node.js and Cloudinary",
    "main": "server.js",
    "scripts": {
      "start": "nodemon server.js"
    },
    "keywords": ["reactjs", "nodejs", "cloudinary"],
    "author": "DEIN_NAME",
    "license": "MIT",
    "dependencies": {
      "cors": "^2.8.5",
      "dotenv": "^16.1.3",
      "express": "^4.18.2",
      "mongoose": "^7.2.2"
    },
    "devDependencies": {
      "nodemon": "^2.0.22"
    }
  }
  ```
- **Hinweis:** Ersetze `DEIN_NAME` durch deinen Namen
- Führe `npm install` im Terminal aus, um die Abhängigkeiten zu installieren

**Schritt 3: Server erstellen**

- importiere die benötigten Module in `server.js`:

```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
```

- Erstelle eine Instanz von Express und konfiguriere CORS:

```javascript
const app = express();
app.use(cors());
app.use(express.json());
```

- Erstelle ein Test Endpunkt:

```javascript
app.get("/", (req, res) => {
  res.send("API is running...");
});
```

- Starte den Server:

```javascript
const PORT = 5000; // oder einen anderen Port deiner Wahl
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

// output: Server läuft auf Port 5000
```

**⚡️ Test mit Thunder Client! ⚡️**

**Schritt 4: Umgebungsvariablen konfigurieren**

- In deine `.env`-Datei füge folgende Umgebungsvariablen ein:

  - Deine Portnummer
  - MongoDB-URI

**Schritt 5: MongoDB-Verbindung herstellen**

- Erstelle eine Datei `connectDB.js` im `database`-Ordner und füge folgenden Code ein:

```javascript
import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
```

- Dieser Code nimm eine MongoDB-URI und verbindet die Anwendung mit der Datenbank
- Importiere die Funktion in `server.js` und rufe sie auf:

```javascript
//... andere Imports
import connectDB from "./database/connectDB.js"; //achte auf den Pfad!

//... andere Code
```

- Ändere den Serverstart-Code wie folgt:

```javascript
const startServer = async () => {
  try {
    await connectDB(connectionString);
    console.log("verbindung mit MONGODB hat geklaptt!");
    //
    app.listen(port, () => {
      console.log(`Port läuft auf Port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// output: verbindung mit MONGODB hat geklaptt!
//           Port läuft auf Port: 5000
```

**Schritt 6: Modelle erstellen**

- Erstelle eine Datei `productModel.js` im `models`-Ordner
- Das Schema für das Produktmodell sollte folgende 3 Felder enthalten:
  - name (type: String, required)
  - image (type: String, required)
  - description (type: String, required)

```javascript
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const productModel = mongoose.model("product", ProductSchema);

export default productModel;
```

**Schritt 7: Controller erstellen**

- Erstelle eine Datei `productController.js` im `controllers`-Ordner
- Der Controller sollte folgende Funktionen enthalten:

  - `getProducts` - Alle Produkte abrufen
  - `createProduct` - Ein neues Produkt erstellen

- Der `createProduct`-Controller:

```javascript
async function createProduct(req, res) {
  const { name, description, image } = req.body;
  try {
    const product = new productModel({
      name,
      description,
    });
    await product.save();
    res.status(201).json({ message: "Product erfolgreich gespeichert" });
  } catch (error) {
    res.status(500).json({ message: "Fehler bei der Speicherung" });
  }
}
```

- Der `getProducts`-Controller:

```javascript
async function getProducts(req, res) {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Produkte" });
  }
}
```

**Schritt 8: Routen erstellen**

- Erstelle eine Datei `productRoutes.js` im `routes`-Ordner
- Importiere die Controller und Express in die Datei:

```javascript
import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/productControllers.js";
```

- Erstelle Routen für die beiden Controller:

```javascript
const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);

export default productRouter;
```

**Schritt 9: Server konfigurieren**

- Importiere die Routen in `server.js`:

```javascript
//... andere Imports
import productRouter from "./routes/productRoutes.js";

//... andere Code
```

- Verwende die Routen nach dem CORS-Setup:

```javascript
//... andere Code
app.use("/products", productRouter);
```

**⚡️ Test mit Thunder Client! ⚡️**

## Fazit

In diese Schritte hast du folgendes gemacht:

- Ein neues Node.js-Projekt erstellt
- Einen Express-Server erstellt
- Eine MongoDB-Verbindung hergestellt
- Ein Produktmodell erstellt
- Controller und Routen für das Produkt erstellt
- Die Routen im Server konfiguriert

In den nächsten Schritten werden wir:

- ein Frontend erstellen
- Frontend mit diesem Backend verbinden
