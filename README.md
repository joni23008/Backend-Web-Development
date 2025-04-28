### Backend-Web-Development - ryhmätyö

## Kuvaus

- Palvelu elokuvien arvostelua varten.

* home-page : lista elokuvista apin kautta, tallennettu databaseen collectionsiin "movies". napilla painamalla näkee jo kirjoitetut arvostelut. napista painamalla voi kirjoittaa arvostelun (user). nappi josta pääsee kirjautumaan useriksi ja näkee sen user-sivun
* user-page : näkee arvostellut elokuvat, voi muokata niitä, ja poistaa

- public:
  näkee elokuva listan ja näkee arvostelut. ei pysty kirjottamaan

- users:
  pystyy kirjoittamaan, lukemaan, poistamaan omat, muokkaamaan omia

- extrat:
  admin, käyttäjä ja ehkä sivu, nakee ja pystyy poistamaan kaiken

## Tietokanta-rakenne

1. users collection
   - username: String
   - password: String
   - id: MongoDB generoima
   - role : String
2. movies collection
   - id: int, (Mongoid)
   - tmdbId: int
   - genre_ids: array of ints
   - overview: String
   - released date: String
   - title : String
3. reviews collection
   - movie id: viittaus mongodb collectionii "movies" ja kyseiseen elokuvaan (id)
   - user id: viittaus mongodb collectionii "users" ja kyseiseen käyttäjään (id)
   - rating: Number
   - comment: String
   - created at: Date
   - udated at: Date
   - id: MongoDB generoima

4. Genre collection
   - _id: int(Mongoid)
   - id: int
   - Name : String



## Moduulit / Mitä ollaan käytetty

- npm install

- "axios": "^1.9.0",
- "bcryptjs": "^3.0.2",
- "connect-flash": "^0.1.1",
- "dotenv": "^16.5.0",
- "express": "^5.1.0",
- "express-handlebars": "^8.0.2",
- "express-session": "^1.18.1",
- "mongoose": "^8.13.2",
- "passport": "^0.7.0",
- "passport-local": "^1.0.0"

## Elokuva API

https://www.themoviedb.org/

## Kanban

https://planner.cloud.microsoft/webui/plan/-I8GmFpvIEa6WyCMfhZCPpYAAbBp/view/board?tid=fbd2f045-b34c-4673-9534-8f2374355cec

## Accessablity - palautus

https://1drv.ms/w/c/67b09aef79f35846/Ea1AXKkPy3NFqVtmKoH4qNcBSUtz19nGJUsFDGIY8_K-9A?e=f8XVga

## Meeting Notes

https://1drv.ms/x/c/67b09aef79f35846/Ea1YVCH0I5RJuSC8Jcit-PUBCDei5m09DFoykiYCPk4Kbw?e=PYeupm
