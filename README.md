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
2. movies collection
   - nimi: String
   - julkaisuvuosi: Date
   - kategoria: String
   - kuvaus: String
   - id: MongoDB generoima
3. reviews collection
   - movie id: viittaus mongodb collectionii "movies" ja kyseiseen elokuvaan (id)
   - user id: viittaus mongodb collectionii "users" ja kyseiseen käyttäjään (id)
   - rating: Number
   - comment: String
   - created at: Date
   - id: MongoDB generoima

## Työnjako:

- JONI: reviews reitit, crud operaatiot ja schema
- TEEMU: moviedb api käyttöönotto ja testaus. ei tarvitse tallentaa tietokantaan vielä
- TEEMU: nähtäis handlebars sivulla mongodb dummy dataa
- NIKO: käyttäjä systeemi, miten saadaan erotettua public/user ja selain muistaa, sisäänkirjautuminen

## Moduulit

- npm install express
- npm install express-handlebars
- npm install dotenv
- npm install mongoose
- npm install nodemon --save-dev

## Elokuva API

https://www.themoviedb.org/

## Kanban

https://planner.cloud.microsoft/webui/plan/-I8GmFpvIEa6WyCMfhZCPpYAAbBp/view/board?tid=fbd2f045-b34c-4673-9534-8f2374355cec

## Accessablity - palautus

https://1drv.ms/w/c/67b09aef79f35846/Ea1AXKkPy3NFqVtmKoH4qNcBSUtz19nGJUsFDGIY8_K-9A?e=f8XVga

## Meeting Notes

https://1drv.ms/x/c/67b09aef79f35846/Ea1YVCH0I5RJuSC8Jcit-PUBCDei5m09DFoykiYCPk4Kbw?e=PYeupm
