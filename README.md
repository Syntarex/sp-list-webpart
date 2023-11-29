# SP List WebPart

Ein WebPart, welcher eine SharePoint-Liste anzeigen kann. Bietet mehr Funktionen als der Standard-WebPart.
Funktioniert auf SharePoint 2019 und SharePoint Online.

## Vorbereitungen

1. Installiere [Node v8](https://nodejs.org/en/blog/release/v8.17.0)
2. Installiere [Python 2](https://www.python.org/downloads/windows)
3. Installiere [Visual Studio Code](https://code.visualstudio.com/download)

## Verwenden der Projektvorlage

Um die Projektvorlage zu verwenden, muss das Repository geklont und anschließend neu initialisiert werden.

##### Klonen

```
$ git clone git@github.com:Syntarex/spfx2019-template.git
```

##### Neu initialisieren

```
$ rmdir .git
$ git init
```

##### IDs ändern

Jede Lösung muss eine eindeutige UUID besitzen.
Diese findet man unter:

-   `/config/package-solution.json`

Jeder WebPart muss eine eindeutige UUID besitzen.
Diese findet man unter:

-   `/src/webparts/example.manifest.json`

Jede Extension muss eine eindeutige UUID besitzen. Diese muss an mehreren Stellen geändert werden.

-   `/src/webparts/example.manifest.json`
-   `/sharepoint/assets/ClientSideInstance.xml`
-   `/sharepoint/assets/elements.xml`

##### Installieren

1. Installiere alle Projekt-Abhängigkeiten: `npm install`
2. Erstelle SSL-Zertifikat: `npm run trust-dev-cert`

## Scripts

Die folgenden Skripte können im Terminal ausgeführt werden.

### build

Nutzt die SPFx Buildchain um TypeScript- und SCSS-Code zu kompilieren.

```
npm run build
```

### ship

Nutzt die SPFx Buildchain um TypeScript- und SCSS-Code optimiert zu kompilieren und führt alle Projekt-Assets zu einer bereitstellbaren SharePoint-Lösung zusammen.

```
npm run ship
```

### clean

Löscht cache- und alte build-Dateien.

```
npm run clean
```

### serve

Startet einen Test-Server und ein bereitstellbares Lösungspaket, welches auf den Test-Server zeigt.

```
npm run serve
```

## Projektstruktur

Die folgende Ordnerstruktur wird standardmäßig von der Projektvorlage verwendet:

-   `/.vscode`: Verzeichnis für Konfiguration der Entwicklungsumgebung
-   `/config`: Konfiguration von SPFx und des Lösungspaketes
-   `/docs`: Weiterführende Informationen
-   `/node_modules`: Ein Verzeichnis mit allen installierten Abhängigkeiten
-   `/src`: Beinhaltet den Quellcode
-   `/src/components`: Beinhaltet alle React-Komponenten
-   `/src/data`: Beinhaltet Datenlogik (Abfragen, Filterungen etc.)
-   `/src/model`: Beinhaltet Typen bzw. Datenmodelle
-   `/src/webparts`: Beinhaltet WebPart-Klassen
-   `/src/webparts/loc`: Beinhaltet Lokalisierungsdateien
-   `/teams`: Metadaten und Assets, falls die Lösung auch als Teams-App ausgerollt werden soll

Zusätzlich gibt es im Root-Verzeichnis Dateien:

-   `/.editorconfig`: Konfiguriere Visual Studio Code Editor
-   `/.gitattributes`: Forciere Metadaten bei Git-Commit
-   `/.gitignore`: Erlaubt das Exkludieren von Dateien und Ordnern für Git
-   `/.prettierrc`: Konfiguriert das Prettier-Plugin
-   `/gulpfile.js`: Steuert verschiedene Aspekte der SPFx-Buildchain. **Achtung: Bearbeite diese Datei nur, wenn du weißt was du tust.**
-   `/package.json`: Metadaten zum Projekt, sowie eine Liste der Abhängigkeiten
-   `/tsconfig.json`: Konfiguriert den TypeScript-Compiler

## Integration von eigenem Code

Es gibt einige global verfügbare Funktionen und Integrationsmöglichkeiten. Diese werden alle über das global verfügbare window-Objekt gesteuert.

### Listendaten neuladen

Sollten die Daten an anderer Stelle geändert werden, können die Listendaten von außen aktualisiert werden.

```
window["refresh"]();
```

### Button-Funktionalität

Die im Header konfigurierbaren Buttons können mit eigener Logik versehen werden. Hierfür wird einfach der Name des Buttons als Funktion angegeben. Angenommen der Button heißt `approve`, dann würde der Code so aussehen:

```
window["approve"] = (selectedItems) => console.log(selectedItems);
```

Der Parameter `selectedItems` enthält alle vom Benutzer ausgewählten Listenelemente.

### Zellen-Rendering überschreiben

Das Rendering einer Zelle kann über das Window-Objekt überschrieben werden.
Die eigene Rendering-Funktion muss eine React-Komponente zurückgeben, welche dann gerendert wird.
Angenommen die Spalte heißt `Person`, würde der Code so aussehen:

```
window[`render-Person`] = (props) => {
    ...
}
```

Die übergebenen `props` enthalten die Felder `column`, `row`, `cell`.

-   `column` enthält alle Informationen zur Spalte.
-   `row` enthält alle Informationen zur Zeile (inkl. benachbarte Daten).
-   `cell` enthält das Objekt, welches in der Zelle gerendert werden soll.

## TODOs:

-   Boolfeld-Darstellung konfigurierbar machen (Ja/Nein oder CheckBox)
-   Filter- und Sortierungen
-   Klassennamen
