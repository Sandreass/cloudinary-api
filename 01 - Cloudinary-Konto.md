# Cloudinary Konto erstellen im Browser

- Erstelle ein Konto bei [Cloudinary](https://cloudinary.com/)

![HomePage](<assets/Screenshot from 2023-06-17 13-58-28.png>)

- Kopiere den Cloud-Namen, den API-Schlüssel und das API-Geheimnis aus dem Dashboard und speichere sie für später in einer `.env` Datei.

```env
CLOUDINARY_CLOUD_NAME=DEIN_CLOUD_NAME
CLOUDINARY_API_KEY=DEIN_API_KEY
CLOUDINARY_API_SECRET=DEIN_API_SECRET
```

![Cloudinary UI - Frame 1](<assets/Cloudinary UI - Frame 1.jpg>)

- erstelle einen Ordner in deiner Medienbibliothek, um die Projektbilder zu speichern, um sie organisatorisch zu speichern, z.B. `products`.

![Cloudinary UI - Frame 2](<assets/Cloudinary UI - Frame 2.jpg>)

![Cloudinary UI - Frame 3](<assets/Cloudinary UI - Frame 3.jpg>)

- Navigiere zum `settings` Tab und klicke auf `upload` und scrolle runter zu `upload presets` und klicke auf `add upload preset` und erstelle ein neues Preset für die Projektbilder, z.B. `products`.

![Cloudinary UI - Frame 4](<assets/Cloudinary UI - Frame 4.jpg>)
![Cloudinary UI - Frame 5](<assets/Cloudinary UI - Frame 5.jpg>)
![Cloudinary UI - Frame 6](<assets/Cloudinary UI - Frame 6.jpg>)

- gibt einen Namen für das Preset ein, z.B. `cloudimage` in diesem Fall.
- wechsle den `Signing Mode` zu `unsigned`.
- Füge ein `folder name` hinzu, z.B. `products` in diesem Fall. (nur wenn du einen Ordner in der Medienbibliothek erstellt hast)

![Cloudinary UI - Frame 7](<assets/Cloudinary UI - Frame 7.jpg>)

- speichere das Preset und kopiere den Namen des Presets und speichere ihn für später.
