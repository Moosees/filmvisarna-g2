# Filmvisarna AB - Webbsajt för Biografbokning

Filmvisarna AB är en biografkedja i Småstad som erbjuder en modern och interaktiv webbsajt för att förbättra användarupplevelsen vid bokning av biobiljetter. Projektet är byggt med **React**, **Bootstrap**, och **TypeScript** för att säkerställa snabb utveckling och underhållbar kod.
![Filmvisarna home](/src/assets/images/Filmvisarna%20home.png)
_Bild: Startsidan för Filmvisarna-webbplatsen._

## Funktioner

1. **Information om Filmer**

   - Detaljsidor för filmer med trailers, beskrivningar och annan relevant information.

2. **Bokning av Biobiljetter**

   - Grafisk visning av salonger och stolar.
   - Dynamisk markering av bästa tillgängliga stolar.
   - Stöd för olika biljettpriser:
     - Vuxen: 140 kr
     - Pensionär: 120 kr
     - Barn: 80 kr
   - Direktuppdatering av totalpris och valda stolar.

3. **Bokningsbekräftelse**

   - Generering av unikt bokningsnummer.
   - E-postbekräftelse skickas automatiskt.

4. **Filtrering och Sortering**

   - Filtrera filmer efter titel, datum och åldersgräns.

5. **Användarkonton**

   - Registrering, inloggning och hantering av bokningshistorik.

6. **Responsiv Design**
   - Optimerad för mobiler, surfplattor och datorer med hjälp av **Bootstrap**.

## Teknologier

### Frontend

- **React**: För att skapa en dynamisk och interaktiv användarupplevelse.
- **Bootstrap**: För att bygga en responsiv och användarvänlig layout.
- **Sass**: För mer avancerad och modulär CSS-hantering.
- **TypeScript**: För att förbättra kodens robusthet och typkontroll.
- **React Router**: För att hantera applikationens navigering och routes.
- **TanStack Query**: För effektiv hantering av datahämtning och caching.
- **Axios**: För att skicka och hämta data från API:er på ett enkelt sätt.

### Backend

- **Node.js**: För att bygga och köra servern.
- **Express.js**: Ett flexibelt ramverk för att skapa API:er och hantera serverlogik.
- **mysql2**: För att ansluta och kommunicera med MySQL-databasen.
- **MySQL**: Databas för att lagra och hantera boknings- och användardata.
- **Nodemailer**: För att skicka e-postbekräftelser till användare efter bokningar.

## Installation och Körning

Följ stegen nedan för att köra projektet lokalt:

1. **Klona repository**

   ```bash
   git clone https://github.com/Moosees/filmvisarna-g2.git
   cd filmvisarna

   ```

2. **Installera Beroenden:**

   ```bash
   npm install
   ```

   3. **Starta Webbplatsen:**

   ```bash
   npm start
   ```

   Webbplatsen startar på [http://localhost:5173/](http://localhost:5173/) som standard.

## Utvecklare

Detta projekt utvecklades av:

- **Linus Almgren**
- **Motasem Abushareefih**
- **Johan Håkansson**
- **Sara Johnsson**
- **Emily Wåhlin**
- **Emilia Sundin**
