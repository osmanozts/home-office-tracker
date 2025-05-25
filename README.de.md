# Home Office Time Tracker

Dies ist eine Webanwendung, die Mitarbeitenden hilft, ihre Arbeitszeiten im Homeoffice zu erfassen. Entwickelt mit Next.js, Supabase und Resend.

Die Implementierung wurde in einem fokussierten Zeitfenster von 6–8 Stunden abgeschlossen. Dabei lag der Fokus auf hoher Effizienz, ohne Kompromisse bei Codequalität oder Struktur einzugehen.

## Funktionsweise

Hier ein Überblick darüber, wie die Kernfunktionen der Anwendung funktionieren:

### Authentifizierung

Die Anwendung erfordert eine Anmeldung, bevor Funktionen genutzt werden können. Zum Testen stehen folgende vorab registrierte Demo-Konten zur Verfügung:

- **E-Mail**: test@mail.de  
  **Passwort**: pw12345

- **E-Mail**: test2@mail.de  
  **Passwort**: pw12345

Diese Konten sind bereits im Supabase-Auth-System registriert und mit entsprechenden Einträgen in der `employees`-Tabelle verknüpft.

Wenn neue Benutzerkonten registriert werden, löst die Anwendung eine Postgres-Funktion aus, die die Nutzerdaten aus der `auth.users`-Tabelle in die öffentliche `employees`-Tabelle überträgt.

### Aktive Sitzung

Wenn ein Benutzer eine Sitzung startet, wird ein neuer Eintrag in der Tabelle `homeoffice_sessions` erstellt, in dem der Startzeitpunkt gespeichert wird. Die Sitzung bleibt aktiv, bis sie manuell beendet wird – dann wird die Endzeit aktualisiert.

Beim Beenden einer Sitzung wird eine E-Mail an die konfigurierte Email gesendet, die die Sitzungsdetails wie Startzeit, Endzeit und Dauer enthält.

### Sitzungsverlauf

Vergangene Sitzungen können im Bereich **"Vergangene Sessions"** eingesehen werden. Die App liest dazu die Daten aus der Tabelle `homeoffice_sessions` und zeigt Start- und Endzeit sowie die Dauer jeder Sitzung an.

## Tech-Stack

Der Tech-Stack wurde mit starkem Fokus auf schnelles Prototyping, Wartbarkeit und moderne Entwicklungsstandards ausgewählt. Aufgrund des begrenzten Implementierungszeitraums von etwa 6–8 Stunden mussten die Tools ein hohes Maß an Abstraktion, exzellente Dokumentation und nahtlose Integration bieten.

- **Next.js**: Ein auf React basierendes Framework, das sowohl Frontend- als auch Backend-Entwicklung in einer gemeinsamen Codebasis ermöglicht. Es erlaubt schnelle Entwicklung durch integriertes Routing, API-Routen und serverseitiges Rendering.
- **Supabase**: Als Backend-Plattform gewählt wegen des sofort einsatzbereiten Postgres-Setups, integrierter Authentifizierung und Echtzeitdatenbank-Funktionalität.
- **Resend**: Eingesetzt für den Versand transaktionaler E-Mails (z. B. Benachrichtigungen beim Starten/Stoppen von Sitzungen).
- **Chakra UI**: Eine moderne und barrierefreie Komponentenbibliothek, die die UI-Entwicklung deutlich beschleunigt.

## Datenbankstruktur

Das Datenbankschema ist so konzipiert, dass es Mitarbeiterdaten, die Erfassung von Home-Office-Sitzungen sowie Rollen (zukünftige Erweiterungsidee) zur erweiterten Anpassung abbildet.

### Zentrale Tabellen

- **auth.users**: Diese Tabelle wird zur Authentifizierung der Benutzer verwendet. Sie ist in die Supabase-Authentifizierung integriert.
- **employees**: Enthält mitarbeiterspezifische Informationen, wie z. B. die jeweilige Rolle im Unternehmen und die Zuordnung zum Benutzer.
- **homeoffice_sessions**: Diese Tabelle erfasst alle aktiven und vergangenen Sitzungen und speichert Informationen wie Startzeit, Endzeit, Dauer und Benutzerreferenz.
- **roles**: Geplante Erweiterung zur Verwaltung benutzerdefinierter Rollen innerhalb des Systems (z. B. Admin oder Manager).

## Umgebungsvariablen

Die Anwendung erfordert einige Umgebungsvariablen, die korrekt gesetzt sein müssen. Stelle sicher, dass die folgende Konfiguration in deiner `.env`-Datei vorhanden ist:

- `NEXT_PUBLIC_SUPABASE_URL`: Die URL deiner Supabase-Instanz.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Der anonyme API-Schlüssel für den Zugriff auf Supabase-Dienste.
- `NEXT_PUBLIC_MAIL_API_KEY`: Dein Resend-API-Schlüssel zum Versenden von E-Mails.
- `NEXT_PUBLIC_SENDER_MAIL`: Die Absender-E-Mail-Adresse für Benachrichtigungen.
- `NEXT_PUBLIC_RECIPIENT_MAIL`: Die Empfänger-E-Mail-Adresse für Benachrichtigungen.

## Installation

Um mit dem Home Office Time Tracker zu starten, folge diesen Schritten:

1. Repository klonen:

```bash
git clone https://github.com/osmanozts/home-office-tracker
```

    Abhängigkeiten installieren:

```bash
npm install
```

    Umgebungsvariablen einrichten:

Erstelle im Projektverzeichnis eine .env-Datei basierend auf dem oben genannten Template.

    Supabase lokal einrichten:

Lade Supabase herunter und starte die lokale Instanz folgendermaßen:

    Stelle sicher, dass Docker installiert und ausgeführt wird.

    Starte Supabase lokal mit:

```bash
npx supabase start
```

Stelle sicher, dass deine Umgebungsvariablen SUPABASE_URL und SUPABASE_ANON_KEY auf deine lokale Instanz zeigen:

NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<dein-anon-key>

Alle Datenbankschemata und Migrationen befinden sich im Ordner supabase/migrations. Du kannst sie mit den entsprechenden Supabase CLI-Befehlen anwenden, um das Schema einzurichten.

    Anwendung starten:

```bash
npm run dev
```

Die Entwicklungsumgebung wird unter http://localhost:3000 verfügbar sein.

## Zukünftige Erweiterungen

Die aktuelle Implementierung konzentriert sich auf das Verfolgen und Verwalten von Home-Office-Sitzungen innerhalb eines effizienten Zeitrahmens von 6–8 Stunden. Dennoch gibt es mehrere Bereiche für potenzielle zukünftige Verbesserungen:

- **Benutzerdefinierte Rollen**: Die `roles`-Tabelle kann erweitert werden, um benutzerdefinierte Rollen wie "Manager", "Personalabteilung" oder "Admin" zu erstellen, die zusätzliche Berechtigungen haben (z. B. das Ansehen von Sitzungen anderer Mitarbeiter).

- **Mobile Unterstützung**: Obwohl diese App derzeit webbasiert ist, könnte in Zukunft eine mobile Version mit React Native entwickelt werden.
