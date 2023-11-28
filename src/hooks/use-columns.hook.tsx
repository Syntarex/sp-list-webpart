import * as dayjs from "dayjs";
import { endsWith, isArray, isBoolean, isNumber, isObjectLike, isString } from "lodash";
import { Checkbox, IColumn, Icon, Stack, Text } from "office-ui-fabric-react";
import * as React from "react";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Chip } from "../components/chip/chip.component";
import { UserOrGroup } from "../components/user-or-group/user-or-group.component";
import { fieldsSelector } from "../data/list.data";
import { warn } from "../util/log.util";

/** Gibt die Spalten anzuzeigenden Spalten für eine DetailsList zurück. */
export const useColumns = () => {
    const fields = useRecoilValue(fieldsSelector);

    // Renders one value
    const renderValue = React.useCallback((value: any, dateFormat = "DD.MM.YY") => {
        // Wert ist ein Boolean
        if (isBoolean(value)) {
            return <Checkbox checked={value} />;
        }

        // Wert ist ein String
        if (isString(value)) {
            // Wert ist ein SharePoint Date-String
            if (endsWith(value, "Z") && dayjs(value).isValid()) {
                return (
                    <Stack horizontal verticalAlign={"center"} tokens={{ childrenGap: 5 }}>
                        <Icon iconName={"Calendar"} />
                        <Text>{dayjs(value).format(dateFormat)}</Text>
                    </Stack>
                );
            }

            return <Text>{value}</Text>;
        }

        // Wert ist eine Zahl
        if (isNumber(value)) {
            return <Text>{value}</Text>;
        }

        // Feld-Typ benötigt kein spezielles Rendering, entsprechend zeige einfach den Wert an
        return <>{value}</>;
    }, []);

    const columns: IColumn[] = useMemo(
        () =>
            fields.map((column) => ({
                key: column.InternalName,
                name: column.Title,
                minWidth: 100,
                isResizable: true,

                fieldName: column.InternalName,
                onRender: (row) => {
                    try {
                        // Der Typ der anzuzeigenden Spalte
                        const type: string = (column as any)["odata.type"];

                        // Der Wert des Feldes
                        let value = row[column.InternalName];

                        // Kein Typ oder Wert angegeben, also rendere nichts
                        if (!type || !value) {
                            return null;
                        }

                        // Anzeigeformat für Datum
                        // TODO: Konfigurierbar in WebPart machen
                        let dateFormat = "DD.MM.YYYY";

                        switch (type) {
                            // Auswahl-Feld, also rendere Chip(s)
                            case "SP.FieldChoice":
                            case "SP.FieldMultiChoice":
                                value = (isArray(value) ? value : [value]).map((text, index) => (
                                    <Chip key={`chip-${index}`} value={text} />
                                ));

                                break;

                            // Benutzer/Gruppen, also rendere Personas
                            case "SP.FieldUser":
                                value = (isArray(value) ? value : [value]).map((userOrGroup, index) => (
                                    <UserOrGroup key={`chip-${index}`} value={userOrGroup} />
                                ));
                                break;

                            // Datum + Uhrzeit
                            case "SP.FieldDateTime":
                                // Datum + Uhrzeit als Anzeigeformat gesetzt, wenn "DisplayFormat" auf 1 steht
                                // Datum als Anzeigeformat gesetzt, wenn "DisplayFormat" auf 0 steht
                                // Hänge Uhrzeit an Format an
                                if ((column as any).DisplayFormat) {
                                    dateFormat += " HH:mm";
                                }

                                // Rendering von Datumen passiert später, da auch Felder Datume enthalten können, die kein "SP.FieldDateTime" als Typen haben
                                // Der Case wird also nur verwendet um die entsprechende Formatierung zu setzen
                                break;

                            // Nachschlagen
                            case "SP.FieldLookup":
                                // Das im Nachschlage-Feld gewählte Feld der referenzierten Liste, welches angezeigt werden soll
                                const field: string = (column as any).LookupField;

                                // Packe alle anzuzeigenden Werte aus
                                value = (isArray(value) ? value : [value]).map((each) => {
                                    // Prüfe ob Wert ein Objekt ist
                                    if (!isObjectLike(each)) {
                                        throw new Error(`Lookup value "${field}" is invalid.`);
                                    }

                                    // Prüfe ob anzuzeigendes Feld in Objekt verfügbar ist
                                    if (!each[field]) {
                                        throw new Error(`Lookup value "${field}" to render isn't present.`);
                                    }

                                    return each[field];
                                });

                                break;
                        }

                        return (
                            <Stack wrap horizontal verticalAlign={"center"} tokens={{ childrenGap: 5 }}>
                                {isArray(value) ? (
                                    value.map((each, index) => (
                                        <Stack.Item key={`value-${index}`}>{renderValue(each, dateFormat)}</Stack.Item>
                                    ))
                                ) : (
                                    <Stack.Item>{renderValue(value, dateFormat)}</Stack.Item>
                                )}
                            </Stack>
                        );
                    } catch (ex) {
                        warn("Unable to render column.", ex, column, row);
                        return null; // Rendere nichts, da ein Fehler aufgetreten ist
                    }
                },
            })),
        [fields, renderValue],
    );

    return columns;
};
