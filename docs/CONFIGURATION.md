# Projektkonfiguration

Dieses Dokument soll Aufschluss darüber geben was an welcher Stelle im Projekt konfiguriert werden.

## Editor-Einstellungen

**Einstellungen zum Editor von VSCode können unter `/.editorconfig` gemacht werden.**

Die unter `/.editorconfig` gesetzten Einstellungen werden von der VSCode Erweiterung "EditorConfig" (`editorConfig.editorConfig`) eingelesen und erzwungen.

## VSCode Einstellungen

**Einstellungen zur Entwicklungsumgebung VSCode können unter `/.vscode/settings.json` gemacht werden.**

Diese Vorlage setzt die VSCode Erweiterung "Prettier" (`esbenp.prettier-vscode`) als Standard-Formattierer für den Editor ein.
Bedeutet, dass Prettier beim Speichern den eigenen Code gegen alle festgelegten Prettier-Regeln prüft und gefundene Abweichungen automatisch behebt.

```
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
```

Außerdem werden Imports aus verschiedenen Bibliotheken automatisch optimiert.

```
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
```

## Prettier-Regeln

**Die für das Formattieren festgelegten Regeln können in der Datei `./.prettierrc.js` geändert werden.**

## Projekt-Konfiguration

**Projekteinstellungen können unter `./package.json` gemacht werden.**

In der `./package.json` können allgemeine Projektinformationen sowie Abhängigkeiten gepflegt werden.

Diese Projektvorlage synchronisiert die Versionsnummer der SharePoint-Lösung stets mit der hier hinterlegten Versionsnummer.
So muss diese nicht an zwei Stellen gepflegt werden.

## Lösung konfigurieren

**Das gesamtheitliche Lösungspaket wird unter `/config/config.json` konfiguriert.**

Hier können unter anderem folgende Einstellungen gemacht werden:

-   Verwalten von WebParts und Extensions die dem Lösungspaket hinzugefügt werden
-   Referenzierung von verwendeten Lokalisierungs-Dateien

## Build-Prozess der Lösung konfigurieren

**Die Build-Prozess der gesamtheitlichen Lösung kann unter `/config/package-solution.json` konfiguriert werden.**

-   `includeClientSideAssets`: Gibt Aussage darüber, ob Assets (z. B. Bilder oder CSS-Dateien) mit ihm Lösungspaket abgelegt werden sollen. Empfehlung: `true`
-   `skipFeatureDeployment`: Gibt Aussage darüber, ob ein Admin das Lösungspaket global bereitstellen darf. Ist diese Option auf `false` gesetzt, muss die Lösung in jeder Site Collection manuell hinzugefügt werden um nutzbar zu sein.

_Bitte hier nicht die Versionsnummer der Lösung. Möchtest du diese ändern, nutze bitte das Versionsfeld in der `/package.json`._

## WebPart/Extension konfigurieren

**Jede Extension bzw. jeder WebPart hat ein eigenes Manifest über welches er konfiguriert werden kann. Das Manifest es Beispiels-WebParts dieser Projektvorlage befindet sich unter `/src/webparts/example/example.manifest.json`.**

Hier können unter anderem folgende Einstellungen gemacht werden:

-   Name und Beschreibung des WebParts
-   Icon des WebParts im WebPart-Selector in SharePoint
-   Berechtigungen für externe APIs (z. B. Microsoft Graph)
-   Konfiguration der WebPart-Properties
