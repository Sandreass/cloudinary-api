# Backend Mit Node.js und Cloudinary Erstellen (Teil 2)

- In diese Abteilung werden wir:
  - `server.js` Datei bearbeiten
  - `productModel.js` Datei bearbeiten
  - `productController.js` Datei bearbeiten
  - cloudinary installieren und konfigurieren

## `server.js` Datei bearbeiten

- füge die folgenden Zeilen in die `server.js` Datei ein. Am besten direkt nach `app.use(cors())`:

- Du kannst die andere `app.use(express.json())` Zeile entfernen, da sie durch die neue Zeile ersetzt wird

```javascript
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
```

- Diese Zeilen konfigurieren Express, um JSON- und URL-codierte Daten zu verarbeiten
- `limit: "30mb"` gibt die maximale Größe der Daten an, die der Server verarbeiten kann
- `extended: true` gibt an, dass verschachtelte Objekte in den Daten verarbeitet werden können
- **Hinweis:** Du kannst die Größe auf deine Bedürfnisse anpassen

## `productModel.js` Datei bearbeiten

- füge die folgenden Zeilen in die `productModel.js` Datei ein. Am besten direkt nach `description`:

```javascript
image: { type: String, required: true },
imgpub: String,// hier wird das public_id von Cloudinary gespeichert um das Bild später zu löschen
```

- Dieses Feld wird den Bildpfad des Produkts speichern

- Du könntest jetzt dein Server Testen, ABER ich empfehle dir, die folgenden Schritte zu befolgen, um Cloudinary zu installieren und zu konfigurieren

## Cloudinary installieren und konfigurieren

- Diese Information kommt aus dem Docs und auch von meinen eigenen Erfahrungen
- Ich kann leider einige Schritte nicht genau erklären, da ich sie auch von anderen Quellen gelernt habe. Funktioniert aber gut!
- Führe den folgenden Befehl im Terminal aus, um Cloudinary zu installieren:

```bash
npm install cloudinary
```

- Füge dein Cloudinary-API-Schlüssel, API-Geheimnis und Cloud-Namen in die `.env` Datei ein:

```env
CLOUDINARY_CLOUD_NAME=DEIN_CLOUD_NAME
CLOUDINARY_API_KEY=DEIN_API_KEY
CLOUDINARY_API_SECRET=DEIN_API_SECRET
```

- erstelle einen Ordner namens `cloudinary` und erstelle eine Datei (wie `cloudinaryConfig.js`) und füge die folgenden Konfigurationsinformationen hinzu:

```js
//1 importiere cloudinary
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

//2 konfiguriere cloudinary mit deinen Umgebungsvariablen
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//3 exportiere cloudinary
export { cloudinary };
```

- importiere die `cloudinaryConfig.js` Datei in deiner `productController.js` Datei und bearbeite die `createProduct` Funktion, um das Bild in Cloudinary hochzuladen:

```javascript
import { cloudinary } from "../cloudinary/cloudinaryConfig.js";

const createProduct = async (req, res) => {
  // hole die Daten aus dem Request (Bild inklusive)
  const { name, description, price, image } = req.body;

  // lade das Bild in Cloudinary hoch (cloudinary scheint eigene error handling zu haben)
  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "reactdinary",
      public_id: `${name}`,
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "svg",
        "webp",
        "jfif",
        "ico",
      ],
    },
    function (error, result) {
      if (error) throw error;
    }
  );

  // du kannst das Bild in der Konsole ausgeben, um zu sehen, ob es funktioniert hat
  console.log(uploadedImage);

  // hole den `secure_url` aus dem `uploadedImage` Objekt.  Das ist der Pfad zum Bild in Cloudinary
  const cloudImg = uploadedImage.secure_url;

  // hole den `public_id` aus dem `uploadedImage` Objekt.  Das brauchst du, um das Bild später zu löschen
  const cloudImgPub = uploadedImage.public_id;
  // erstelle ein neues Produkt mit dem Bildpfad
  try {
    const product = new productModel({
      name,
      description,
      image: cloudImg, // hier wird das Bildpfad gespeichert
      imgpub: cloudImgPub, // hier wird das public_id gespeichert
    });
    await product.save();
    res.status(201).json({ message: "Product erfolgreich gespeichert" });
  } catch (error) {
    res.status(500).json({ message: "Fehler bei der Speicherung" });
  }
};
```

## Cloudinary Konto überprüfen

- Jedes Mal, wenn du ein Bild hochlädst, wird es in deinem Cloudinary-Konto gespeichert
- Du kannst dein Konto überprüfen, um sicherzustellen, dass die Bilder hochgeladen wurden

## Produkt Löschen

- Um ein Produkt zu löschen, musst du das Bild in Cloudinary löschen
- Füge die folgende Funktion in deinen `productController.js` hinzu:

```javascript
// @desc   Delete a product
// @route  DELETE /products/:id

async function deleteProduct(req, res) {
  const product = await productModel.findById(req.params.id);

  if (product) {
    // lösche das Bild in Cloudinary
    await cloudinary.uploader.destroy(product.imgpub);
    // lösche das Produkt in der Datenbank
    await productModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Produkt gelöscht!" });
  } else {
    res.status(404);
    throw new Error("Produkt nicht gefunden!");
  }
}
```

## Middleware hinzufügen (BONUS)

- Du kannst Middlesware hinzufügen, um sicherzustellen, dass alle Fehler die nicht abgefangen wurden, an den globalen Fehlerhandler weitergeleitet werden

- Erstelle eine Datei `errorHandlerMiddleware.js` und füge die folgenden Zeilen hinzu:

```javascript
const errorHandlerMiddleware = (error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json(error.message || "irgendwas ist in server schiefgelaufen");
};

export default errorHandlerMiddleware;
```

- Erstellen Sie eine Datei `notFoundMiddleware.js` und fügen Sie die folgenden Zeilen hinzu:

```javascript
const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`Pfad nicht gefunden - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

export default notFoundMiddleware;
```

- `Not Found Middleware` wird aufgerufen, wenn ein Benutzer eine nicht vorhandene Route aufruft

- Importiere die Middleware in deiner `server.js` Datei und füge sie hinzu (am besten direkt nach die Routen):

```javascript
// ... andere imports
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";

// ... andere Middleware

app.use("/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// ... andere Code
```
