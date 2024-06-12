# Frontend Schritte 2 (Bilder hochladen)

- In diesem Schritt werden wir die Funktionalität hinzufügen, um Bilder hochzuladen.
- Wir werden die `FileReader` API verwenden, um die Datei zu lesen und in eine Base64-codierte Zeichenfolge zu konvertieren. Hier ist die Dokumentation zur [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader).

**Schritte 1: Datei auswählen und lesen**

1. Fügen Sie ein `input` Element hinzu, um eine Datei auszuwählen:

```jsx
<div className="lg:w-1/2">
  <div className="form-control w-full">
    <label className="label" htmlFor="image">
      <span className="label-text">Upload an Image:</span>
    </label>
    <input
      type="file"
      id="image"
      className="file-input w-full max-w-xs"
      onChange={handleChange}
      accept="image/png, image/jpg, image/jpeg, image/jfif"
    />
  </div>
</div>
```

2. Erstelle ein `imageUrl` State, um die Base64-codierte Zeichenfolge zu speichern:

```jsx
// ... andere States
const [imageUrl, setImageUrl] = useState("");
```

3. Erstelle eine Funktion `handleImageChange`, um die Datei zu lesen und in eine Base64-codierte Zeichenfolge zu konvertieren mit Hilfe der `FileReader` API:

```jsx
const handleImageChange = (imageFile, e) => {
  const readFile = new FileReader();
  readFile.readAsDataURL(imageFile);
  readFile.onloadend = () => {
    setImageUrl(readFile.result);
  };
};
```

4. Führe ein klein Refactoring durch:
   - ändere `handleChange` in `handleTextChange`
   - erstelle eine Funktion `handleChange`, um den Text und das Bild zu handhaben.
   - füge die `handleImageChange` und `handleTextChange` Funktionen hinzu:

```jsx
const handleChange = (e) => {
  const { id, value, files } = e.target;

  if (id === "image") {
    handleImageChange(files[0], e);
  } else {
    handleTextChange(id, value);
  }
};
```

5. Füge die neue Funktion `handleChange` in das `onChange` Event ALLE deine `input` Elements hinzu:

**Schritte 2: Validierung des Bildes**

- Wir werden die Dateigröße und den Dateityp überprüfen, bevor wir das Bild hochladen.
- Unser Bild sollte nicht größer als 5 MB sein und nur die Dateitypen `png`, `jpg`, `jpeg` oder `gif` akzeptieren.

1. Aktualisiere die `validateForm` Funktion, um die `imageUrl` zu validieren:

```jsx
const validateForm = () => {
  const newErrors = {};
  // ... andere Validierungen
  if (!imageUrl) newErrors.image = "Image is required";
  return newErrors;
};
```

2. Aktualisiere die `handleImageChange` Funktion, um die Dateigröße und den Dateityp zu überprüfen:

```jsx
const handleImageChange = (imageFile, e) => {
  if (
    // Überprüfen Sie die Dateigröße und den Dateityp
    imageFile &&
    (imageFile.type === "image/png" ||
      imageFile.type === "image/jpeg" ||
      imageFile.type === "image/jpg" ||
      imageFile.type === "image/gif") &&
    imageFile.size <= 5000000
  ) {
    const readFile = new FileReader();
    readFile.readAsDataURL(imageFile);
    readFile.onloadend = () => {
      // Bild-URL setzen
      setImageUrl(readFile.result);

      // Fehlermeldung zurücksetzen
      setErrors((prevErrors) => ({ ...prevErrors, image: null }));
    };
  } else {
    e.target.value = null;
    setImageUrl("");
    // Fehlermeldung anzeigen
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: "Invalid file type or size",
    }));
  }
};
```

3. Füge eine Fehlermeldung für das Bild hinzu (unter dem `input` Element):

```jsx
//... andere code
<input
  type="file"
  id="image"
  className="file-input w-full max-w-xs"
  onChange={handleChange}
  accept="image/png, image/jpg, image/jpeg, image/jfif"
/>;

// Fehlermeldung für das Bild
{
  errors.image && <p className="text-sm text-red-500">{errors.image}</p>;
}
```

4. Füge die `imageUrl` in das `handleSubmit` Event hinzu:

```jsx
const handleFormSubmit = async (e) => {
  //... andere code
  setUploading(true);
  const productData = {
    name,
    description,
    image: imageUrl, // Bild-URL hinzufügen
  };
  console.log("Form data: ", productData); // log the form data

  //... andere code
};
```

**Schritte 3: Bildvorschau anzeigen**

- Wir werden eine Vorschau des hochgeladenen Bildes anzeigen.
- Diese ist optional, aber es ist eine gute Praxis, um sicherzustellen, dass das Bild korrekt hochgeladen wurde.

1. Füge eine `img` Element hinzu, um die Vorschau des Bildes anzuzeigen:

```jsx
{
  imageUrl && (
    <img
      src={imageUrl}
      alt="Uploaded Preview"
      className="mt-3 w-full max-w-xs"
    />
  );
}
```

- Deine `ProductForm` Komponente sollte jetzt so aussehen:

```jsx
import { useState } from "react";

const CreateProductForm = () => {
  const baseUrl = "http://localhost:5050";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!imageUrl) newErrors.image = "Image is required";
    return newErrors;
  };

  const createProducts = async (url, data) => {
    try {
      const response = await fetch(`${url}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "image") {
      handleImageChange(files[0], e);
    } else {
      handleTextChange(id, value);
    }
  };

  const handleImageChange = (imageFile, e) => {
    if (
      imageFile &&
      (imageFile.type === "image/png" || imageFile.type === "image/jpeg") &&
      imageFile.size <= 5000000
    ) {
      const readFile = new FileReader();
      readFile.readAsDataURL(imageFile);
      readFile.onloadend = () => {
        setImageUrl(readFile.result);
        setErrors((prevErrors) => ({ ...prevErrors, image: null }));
      };
    } else {
      e.target.value = null;
      setImageUrl("");
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Invalid file type or size",
      }));
    }
  };

  const handleTextChange = (id, value) => {
    if (id === "name") {
      setName(value);
      if (value) setErrors((prevErrors) => ({ ...prevErrors, name: null }));
    } else if (id === "description") {
      setDescription(value);
      if (value)
        setErrors((prevErrors) => ({ ...prevErrors, description: null }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData = {
      name,
      description,
      image: imageUrl,
    };
    console.log("Form data: ", productData); // log the form data

    const response = await createProducts(baseUrl, productData);

    setMessage(response.message);

    // Reset the image URL
    setImageUrl("");

    // Clear the form
    e.target.reset();
    setName("");
    setDescription("");
    setErrors({});
  };

  return (
    <>
      <>
        <h1 className="mb-12 text-center text-3xl font-bold uppercase text-primary">
          Add a Product
        </h1>
        {message && (
          <p className="mt-3 text-xs font-bold text-green-500">{message}</p>
        )}
      </>

      <form onSubmit={handleFormSubmit} className="m-x-auto w-full">
        <div className="flex flex-col gap-8 sm:flex-row lg:gap-16">
          <div className="lg:w-1/2">
            <div className="form-control w-full">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                placeholder="Enter name"
                value={name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered w-full resize-none"
                placeholder="Enter description"
                rows={3}
                value={description}
                onChange={handleChange}></textarea>
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="form-control w-full">
              <label className="label" htmlFor="image">
                <span className="label-text">Upload an Image:</span>
              </label>
              <input
                type="file"
                id="image"
                className="file-input w-full max-w-xs"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg, image/jfif"
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image}</p>
              )}
            </div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded Preview"
                className="mt-3 w-full max-w-xs"
              />
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateProductForm;
```

- Wir werden als nächstes die Backend-Endpunkte für das Hochladen von Bildern implementieren.
