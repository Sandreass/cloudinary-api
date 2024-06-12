# Allgemeine Hinweise

## Projekt Planung

- Wir werden versuchen, so viel wie möglich zu planen, bevor wir mit der Entwicklung beginnen - sprich:
  - Wir werden die Anforderungen sorgfältig analysieren:
    - was soll die Anwendung tun?
    - wer wird die Anwendung benutzen?
    - wie wird die Anwendung benutzt?
  - Wir werden die Benutzeroberfläche entwerfen:
    - Benutzeroberfläche skizzieren
    - Was wird auf der Benutzeroberfläche angezeigt?
  - Wir werden die Datenstruktur entwerfen:
    - Welche Daten werden benötigt?
    - Wie werden die Daten gespeichert?
    - Wie werden die Daten abgerufen?
  - Wir werden die Architektur entwerfen:
    - Wie wird die Anwendung strukturiert?
    - Wie werden die Komponenten organisiert?
    - Wie werden die Funktionen organisiert?
  - Wir werden die Technologien auswählen:
    - Welche Technologien werden verwendet?
    - Welche Bibliotheken werden verwendet?
    - Welche Frameworks werden verwendet?
    - Und warum?

## Code Style

- Wir werden `CLEAN CODE` schreiben - sprich:
  - Wir werden unsere Funktionen und Komponenten so klein wie möglich halten
  - Wir werden unsere Funktionen und Komponenten so benennen, dass sie selbsterklärend sind
  - Wir werden unsere Funktionen und Komponenten so schreiben, dass sie nur eine Aufgabe erfüllen
  - Wir werden unsere Funktionen und Komponenten so schreiben, dass sie leicht zu testen sind
  - Wir werden unsere Funktionen und Komponenten so schreiben, dass sie leicht zu warten sind
- Wir werden `DRY` (Don't Repeat Yourself) Prinzipien befolgen - sprich:
  - Wir werden Code Duplikation vermeiden
  - Wir werden Funktionen und Komponenten so schreiben, dass sie wiederverwendbar sind
- Wir werden `KISS` (Keep It Simple, Stupid) Prinzipien befolgen
- Wir werden `YAGNI` (You Aren't Gonna Need It) Prinzipien befolgen - sprich:
  - Wir werden nur das schreiben, was wir brauchen
  - Wir werden keine unnötigen Funktionen oder Komponenten schreiben
- Wir werden `SOLID` Prinzipien soweit wie möglich befolgen - sprich:
  - **S**: Single Responsibility Principle - Eine Funktion/Komponente sollte nur eine Aufgabe erfüllen
  - **O**: Open/Closed Principle - Eine Funktion/Komponente sollte offen für Erweiterungen, aber geschlossen für Änderungen sein
  - **L**: Liskov Substitution Principle - Eine Funktion/Komponente sollte durch eine beliebige Unterklasse ersetzt werden können (in unser fall nicht so relevant, da wir keine Klassen verwenden)
  - **I**: Interface Segregation Principle - Eine Funktion/Komponente sollte nur die Methoden enthalten, die sie benötigt
  - **D**: Dependency Inversion Principle - Eine Funktion/Komponente sollte nicht von konkreten Klassen abhängen, sondern von abstrakten Klassen/Interfaces (in unser fall nicht so relevant, da wir keine Klassen verwenden)

## Version Control

- Wir werden `GIT` verwenden, um unseren Code zu verwalten
- Wir werden jeder Änderung TESTEN, bevor wir sie committen
- Wir werden aussagekräftige COMMIT MESSAGES schreiben
- Wir werden unsere Änderungen REGELMÄSSIG committen

## Dokumentation

- Wir werden unseren Code so dokumentieren, dass er leicht zu verstehen ist
- Wir werden unsere Funktionen und Komponenten so dokumentieren, dass sie leicht zu verwenden sind
- Wir werden für unsere Anwendung eine `README.md` Datei schreiben, die erklärt:
  - Was macht die Anwendung?
  - Screenshots der Anwendung
  - Technologien, die verwendet werden
  - Andere interessante Informationen über die Anwendung
