# SPFx

Dieses Dokument soll einen Überblick darüber geben, was SPFx ist, wie es sich im Ökosystem einfügt und welche Möglichkeiten SPFx während der Entwicklung gibt.

## Entwickler-Features

### Theming

`Fluent UI`-Komponenten werden automatisch nach dem aktuellen ausgewählten SharePoint-Design gethemed. Hier ist keine weitere Konfiguration nötig.

Möchte man selbst Komponenten stylen, hat man im `scss` die Möglichkeit die eingestellten SharePoint-Farben zu nutzen. Hierfür muss folgende Direktive an den Anfang der eigenen `.scss`-Datei gesetzt werden:

```
@import "~@microsoft/sp-office-ui-fabric-core/dist/sass/ThemeOverrides"
```

Anschließend können die Variablen in `ThemeOverrides.scss` genutzt werden um die gesetzten Farben zu nutzen.

### Lokalisierung

Das SharePoint Framework bietet die Möglichkeit lokalisierte Strings zu hinterlegen.
Der WebPart ermittelt die vom Benutzer bevorzugte Sprache selbst und zeigt Texte an.

1. Füge den Pfad der Lokalisierungsdateien zu `/config/config.json` unter dem Feld `localizedResources` hinzu. Achtung: Der Pfad ist relativ zum Build- und nicht dem Source-Verzeichnis. Orientiere dich am Besten am Beispiel
2. Füge den Namen eines Strings der `mystrings.d.ts` hinzu
3. Füge die tatsächlichen Texte der jeweiligen Sprach-Datei hinzu. `en-us.js` ist die Fallback-Sprache, falls die bevorzugte Sprache des Benutzers nicht gefunden wurde

### WebPart Properties

Jede **WebPart Instanz** kann ein Konfigurationsobjekt halten.
Dieses Objekt kann verwendet werden um die Darstellung oder Funktionalität des WebParts konfigurierbar zu machen.

Die Standardeinstellungen des Konfigurationsobjektes werden im Manifest des Webparts (`/src/webparts/bulletin-board/bulletin-board.manifest.json`) unter dem Feld `PreconfiguredEntries/Properties` festgelegt.
Eine Änderung der Standardeinstellungen erfordert ein erneutes Bereitstellen auf dem Zielsystem.

Die Anzeige der WebPart-Einstellungen kann im WebPart selbst (`/src/webparts/bulletin-board/bulletin-board.webpart.tsx`) festgelegt werden. Hierfür wird die Funktion `getPropertyPaneConfiguration` überschrieben.
Der Aufbau des zurückgegebenen Objektes kann der Typisierung bzw. dem Beispiel entnommen werden.

Als Controls zur Bearbeitung einzelner Werte, stellt das SharePoint Framework verschiedene Standards bereit. Diese können der [offiziellen Dokumentation](https://docs.microsoft.com/de-de/sharepoint/dev/spfx/web-parts/basics/integrate-with-property-pane) entnommen werden.

Theoretisch können Controls auch selbst erstellt werden. Der Aufwand ist hierfür allerdings oft ungerechtfertigt hoch. Auch das komplette Panel kann selbst erstellt werden, hiervon wird allerdings stark abgeraten, da dann auch der komplette Daten-Flow selbst gesteuert werden muss.
