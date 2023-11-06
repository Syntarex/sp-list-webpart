# Entwicklung

## Bibliotheken

Eine Übersicht über die wichtigsten verwendeten Bibliotheken.

### React

Für die Frontend-Entwicklung wird das UI-Framework [`react`](https://reactjs.org) genutzt.
React hat einen komponentenbasierten Ansatz und integriert sich sehr gut mit dem SharePoint Framework (`spfx`).

### Office UI Fabric (aka Fluent UI)

[`office-ui-fabric-react`](https://developer.microsoft.com/en-us/fluentui?fabricVer=7#/controls/web) ist eine Bibliothek welche fertige `react`-Komponenten bereitstellt. Diese sind im von Microsoft etablierten Fluent UI-Design und fügen sich optisch sehr gut in den modernen SharePoint ein.

### Lodash

[`lodash`](https://lodash.com/docs) ist eine Hilfsbibliothek mit vielen verschiedenen Hilfsfunktionen. Funktioniert dank seiner makellosen Typsicherheit sehr gut in TypeScript Projekten.

### Recoil

[`recoil`](https://recoiljs.org) wird genutzt um Daten zwischen Komponenten einfacher zu kommunizieren. Recoil reduziert das Rerendering von `react`-Komponenten auf ein Minimum und erhöht so die Performance.

### PnPJS

[`PnPJS`](https://pnp.github.io/pnpjs/v2) ist eine Open-Source Community-Bibliothek, welche Schnittstellen zum SharePoint bereitstellt. So ist es möglich auf Listen, Metadaten und Einstellungen zuzugreifen ohne selbst REST-Querys schreiben zu müssen. Die aktuellste Version für OnPrem-Systeme ist `2.14.0`. Version 3+ ist speziell für SharePoint Online entwickelt worden.

### Yup

[`yup`](https://github.com/jquense/yup) ist eine Bibliothek zur Validierung von Daten. Hiermit können zum Beispiel Formular-Daten oder Objekte, die von einer API stammen, auf ihre Form validiert werden. In OnPrem-Projekten ist die TypeScript-Version zu alt für die neueste Version von `yup`. Entsprechend wird hier eine festgezogene Version verwendet.

## Build-Chain

**ACHTUNG:** Dieses Kapitel ist 100% optional und nicht notwendig um mit SharePoint Framework (SPFx) zu entwickeln.

Die Build-Chain beschreibt das Verwenden verschiedener Tools in Kombination um das Projekt zu bauen und für das Zielsystem verwendbar zu machen.

Unser Zielsystem ist der SharePoint 2019. Die Build-Chain die verwendet wird, stellt das SharePoint Framework (SPFx) für uns bereit. Wir haben allerdings die Möglichkeit an einigen Stellen über Konfiguration oder sogar selbstgeschriebenen Code einzugreifen.

Dieses Dokument soll Aufschluss darüber geben, welche Tools SPFx nutzt und an welchen Stellen wir eingreifen können bzw. sollten.

### npm

**Pakete können in der `/package.json` gepflegt werden.**

SPFx-Lösungen nutzen standardmäßig `npm` als Paket-Manager. Sprich neue Pakete, wie Hilfs- oder Komponenten-Bibliotheken, können über `npm` installiert werden.

`npm` wird außerdem verwendet um sogenannte `scripts` zu definieren. Diese `scripts` sind als Shortcut für Entwickler gedacht um oft verwendete Prozesse zu vereinfachen.

### TypeScript

**Der TypeScript-Compiler kann unter `/tsconfig.json` konfiguriert werden.**

SPFx-Lösungen werden mit der Programmiersprache [TypeScript](https://www.typescriptlang.org) gebaut. Der TypeScript Compiler wird genutzt um geschriebenen TypeScript-Code zu, für den Browser interpretierbaren, JavaScript-Code zu kompilieren.

### Gulp

**Gulp-Prozesse können in der `/gulpfile.js` bearbeitet und hinzugefügt werden.**

`gulp` wird genutzt um Prozesse vom SharePoint Framework (`spfx`) abzubilden. Diese Prozesse können konfiguriert werden. Auch können eigene Prozesse geschrieben werden.

Beispiele für wichtige `gulp`-Prozesse:

-   `gulp clean`: Wird genutzt um cache-Dateien und alte Builds zu löschen
-   `gulp build`: Wird genutzt um mithilfe von WebPack den Code zu kompilieren
-   `gulp package-solution`: Wird genutzt um den kompilierten Code zu einer Paketlösung zusammenzufassen
-   `gulp serve`: Wird genutzt um einen lokalen Test-Server zu starten

### WebPack

**Von einem Eingreifen in WebPack wird stark abgeraten und wird hier auch nicht weiter erklärt.**

`WebPack` wird genutzt um verschiedene Lösungs-Komponenten zu einem Lösungspaket zusammenzuführen. Hierzu zählt das Zusammenführen von mehreren JavaScript-Dateien, dem Hinzufügen von Verwendeten Assets oder dem Kompilieren und Zusammenführen von Styling-Dateien (`scss`).

WebPack führt also viele verschiedene und verteilte Dateien und Formatte zu einem bereitstellbaren Lösungspaket zusammen.

### TSLint

**TSLint ist mittlerweile deprecated und unsupported und ist in der Projektvorlage komplett deaktiviert und durch Prettier ersetzt.**

TSLint wird vor dem eigentlichen TypeScript-Kompilierungsprozess verwendet um den Code auf bestimmte Regeln zu prüfen und ggf. Fehler zu werfen. Wird verwendet um Code-Konventionen zu erzwingen. Beispielhaft kann festgelegt werden, wie viele Zeichen eine Code-Zeile lang sein darf.
