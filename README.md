* Användarregistrering och Inloggning:

- Registrering: Användare kan registrera sig genom att ange sina uppgifter som namn, e-post och lösenord. Vid registrering skapas en ny användare i databasen, och en JWT-token genereras för autentisering.

- Inloggning: Användare kan logga in genom att skapa ett konto med med sin valda e-postadress och lösenord. Vid en lyckad inloggning returneras en JWT-token som används för att skydda privata rutter.

* Uppgiftshantering:

- Skapa uppgifter: Användare kan skapa nya uppgifter och tilldela dem till specifika projekt. Varje uppgift har fält som titel, beskrivning, status, och tidsstämplar för skapande och slutförande.

- Uppdatera uppgifter: Användare kan uppdatera befintliga uppgifter för att ändra deras status, beskrivning eller andra attribut.

- Hämta uppgifter: Användare kan hämta en lista över alla sina uppgifter eller en specifik uppgift genom att ange dess ID.

- Ta bort uppgifter: Användare har möjlighet att ta bort uppgifter som inte längre behövs.

Trullo Användarregistrering och Inloggning Registrering: Användare kan registrera sig genom att ange namn, e-post och lösenord. Vid registrering skapas en ny användare i databasen, och en JWT-token genereras för autentisering.

Inloggning: Användare kan logga in genom att ange e-postadress och lösenord. Vid lyckad inloggning returneras en JWT-token som används för att skydda privata rutter.

* Rollbaserad Åtkomstkontroll

I Trullo finns två roller:

- Admin: Har full tillgång till systemet och kan hantera alla användare och uppgifter.

- User: Kan endast hantera sina egna uppgifter och uppdatera sin egen profil.

* Säkerhet och Åtkomstkontroll
- JWT-autentisering: Applikationen använder JWT för att autentisera användare. Endast autentiserade användare kan utföra skyddade operationer, som att skapa, uppdatera eller ta bort uppgifter.

- Övriga säkerhetsåtgärder: Lösenord hanteras säkert genom att de hashas och aldrig visas i databasen. Applikationen har även olika felmeddelanden beroende på om den körs i produktions- eller utvecklingsläge, vilket ger bättre insikter och säkerhet för användarna.

Använd dessa säkerhetspaket tillsammans för att skapa en säker applikation:
Använd dessa säkerhetspaket tillsammans för att skapa en säker applikation:

Säkerhetspaket:
- bcrypt för att hash lösenord.
- jsonwebtoken för att hantera autentisering via JWT.
- dotenv för att hantera känsliga nycklar.
- helmet för att säkra HTTP-headrar.
- express-rate-limit för att förhindra brute-force attacker.
- express-validator för att validera användarinmatning.

*** Jag har även inkluderat min .env i .gitignore, men följ stegen nedan i Kom igång med projektet eller kontakta mig om något fel inträffar. ***

* Felhantering:

- Try-catch block används för att fånga undantag och förhindra att applikationen kraschar.
- Meningsfulla felmeddelanden returneras som JSON till klienten vid fel (t.ex. 404 eller 401).
- Verifiering av indata som lösenord och e-post görs för att undvika fel längre fram.
- Token-verifiering fångar JWT-fel, vilket förhindrar obehörig åtkomst och ger feedback till användaren.

* Kom igång med projektet:

1. Installera beroenden: Se till att alla nödvändiga paket är installerade genom att köra npm install i din  terminal för att hämta alla beroenden som definierats i package.json.

2. Konfigurera miljövariabler: Skapa en .env-fil där du definierar nödvändiga miljövariabler som JWT_SECRET, databasanslutning, osv. Exempel:   
              JWT_SECRET=dinhemliganyckel
3. Starta servern: Kör kommandot npm run dev för att starta din utvecklingsserver om du använder något som Nodemon, eller npm start för att starta den i produktion.

4. Testa dina API-endpoints: Använd ett verktyg som Postman eller curl för att skicka förfrågningar till API
och verifiera att det fungerar som förväntat. Testa inloggning, skapande av användare, och JWT-autentisering.

* Komma igång i utvecklingsläge

  - Kör npm install för att hämta alla paket.

  - Kör npm run typescript för att starta projektet i utvecklingsläge med TypeScript.

* Testa i produktionsläge
  - Kör npm install.
  - Bygg projektet med npm run build.
  - kör projekt med npm start

* Endpoints och Postman:

Istället för att lista alla endpoints här, kontakta mig för en inbjudan till min Postman Collection. Där har jag redan lagt in alla endpoints och inställningar, inklusive JWT.

*** Databasval ***

Jag har valt att använda endast MongoDB med både REST API och GraphQL för att fördjupa mig i dessa teknologier. Jag ville öka min förståelse och erfarenhet inom detta område och valde därför MongoDB som databasval. Jag har implementerat hash-token och autentisering för REST API med hjälp av JSON Web Tokens (JWT) för att säkerställa säker åtkomst. Jag har inte genomfört autentisering för GraphQL, men planerar att komplettera frontend-delen av mitt projekt för att likna Trello.

*** Konfiguration och paket ***

Projektet använder en .env fil för att hantera miljövariabler, såsom databaskoppling, JWT-hemligheter och e-postinställningar.

* Paket och deras funktioner:
  - bcryptjs: Används för att hasha lösenord innan de sparas i databasen.

  - dotenv: Laddar miljövariabler från en .env fil till process.env.

  - express: Ramverket för att bygga webbservern och hantera HTTP-förfrågningar.

  - jsonwebtoken: Skapar och verifierar JWT-tokens för autentisering.
 
  - mongoose: Hanterar databasoperationer och modeller för MongoDB.


* Utvecklingspaket:
    - cross-env: Sätter miljövariabler på ett plattformsoberoende sätt.

    - nodemon: Startar om servern automatiskt vid ändringar i kod.
  
    - ts-node och tsx: Kör TypeScript-kod direkt i utvecklingsmiljö utan att behöva kompilera till JavaScript först. typescript: Statiskt typningssystem för JavaScript som används för att skriva säkrare kod.


