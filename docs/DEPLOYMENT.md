# Bereitstellungsmöglichkeiten

## Entwicklung und Testing

##### Starten des Test-Servers

```
npm run serve
```

### Workbench

Die WorkBench öffnet sich automatisch beim Starten des Testservers.

Die Workbench ist eine von SPFx bereitgestellte Webseite zum einfachen Entwickeln des WebParts. Die WorkBench befindet sich nicht innerhalb eines "echten" SharePoints und imitiert nur dessen Design; entsprechend sind keine SharePoint-Funktionen (z. B. Abfragen von SharePoint-APIs) verfügbar.

### SharePoint

Startet man den Test-Server, packt einem SPFx ein Lösungspaket (`/sharepoint/solution/<name>.sppkg`), welches in SharePoint bereitgestellt werden kann. Anschließend kann man den WebPart, so wie jeden anderen WebPart, einfach auf einer Seite einbinden und anzeigen lassen.

Der WebPart bezieht seinen Code allerdings vom lokal gehosteten Test-Server, sprich der Code ist nicht in der Lösung selbst.

Dies bringt einige Vorteile mit:

-   Der WebPart ist nur für einen selbst sichtbar
-   Eine Änderung am Code hat eine sofortige Änderung am WebPart zur Folge
-   Man befindet sich im SharePoint-Kontext und kann dessen Features nutzen

Das Lösungspaket muss im App-Catalog hochgeladen und eingecheckt werden.
Anschließend muss die App in jeder Site Collection, in welcher der/die WebPart/Extension verwendet werden soll, installiert werden.

## Produktive Bereitstellung

Ein produktiv verwendbares Lösungspaket (`/sharepoint/solution/<name>.sppkg`) lässt sich mit diesem Kommando erstellen:

```
npm run ship
```

In diesem Lösungspaket befindet sich alles für die produktive Nutzung.

Das Lösungspaket muss im App-Catalog hochgeladen und eingecheckt werden.
Anschließend muss die App in jeder Site Collection, in welcher der/die WebPart/Extension verwendet werden soll, installiert werden.
