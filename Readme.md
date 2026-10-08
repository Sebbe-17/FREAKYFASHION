# **(Svenska) Detta är ett inlämningsprojekt som ska fungera som ett exempel på hur en webbsida kan se ut**.

## Steg ett är att ladda ner beroenden.
1. npm install
2. npm install -g express-generator
3. npm install nodemon -D
4. npm install better-sqlite3

se till att byta ut node med nodemon i package.json så att det ser ut såhär:
"scripts": {
    "start": "nodemon ./bin/www"
  },


## Steg två är att starta servern.
- npm start


## Steg tre är att öppna webbläsaren och gå till http://localhost:3000/ för att se webbsidan.


## Steg fyra är att börja redigera koden i app.js och index.ejs för att anpassa webbsidan efter dina behov.

## Steg fem är att lägga till en databas och använda better-sqlite3 för att hantera data i din webbsida.
- Du kan skapa en databasfil och använda SQL-kommandon för att skapa tabeller och infoga data.
  Sedan kan du använda better-sqlite3 i din app.js för att ansluta till databasen och utföra SQL-frågor för att hämta och visa data på webbsidan.


## Steg sex är att skapa och redigera filer till nedstående sidor.>
1. Products
2. Categories/kläder
3. Search

4. Admin/Products
5. Admin/Products/new
6. Admin/Products/categories
7. Admin/Products/categories/new


## Steg sju är att anpassa designen på webbsidan genom att redigera CSS-filerna och använda HTML och EJS för att skapa en attraktiv och användarvänlig layout.


## Steg åtta är att testa webbsidan och se till att allt fungerar som det ska. Du kan använda webbläsarens utvecklarverktyg för att felsöka eventuella problem och göra förbättringar.


### Note: Steget final touches involverade
1. översätta svenska kommentarer med engelska
2. Förbättra läsbarheten
3. Ta bort duplicerad kod där det var möjligt


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# **(English) This is a submission project that serves as an example of how a website can look**.

## Step one is to download dependencies.
1. npm install
2. npm install -g express-generator
3. npm install nodemon -D
4. npm install better-sqlite3

Make sure to replace node with nodemon in package.json so that it looks like this:
"scripts": {
    "start": "nodemon ./bin/www"
  },


## Step two is to start the server.
- npm start


## Step three is to open the browser and go to http://localhost:3000/ to see the website.


## Step four is to start editing the code in app.js and index.ejs to customize the website according to your needs.

## Step five is to add a database and use better-sqlite3 to manage data in your website.

- You can create a database file and use SQL commands to create tables and insert data.
  Then you can use better-sqlite3 in your app.js to connect to the database and execute SQL queries to fetch and display data on the website.


## Step six is to create and edit files for the following pages.
1. Products
2. Categories/kläder
3. Search

4. Admin/Products
5. Admin/Products/new
6. Admin/Products/categories
7. Admin/Products/categories/new


## Step seven is to customize the design of the website by editing the CSS files and using HTML and EJS to create an attractive and user-friendly layout.


## Step eight is to test the website and make sure everything works as it should. You can use the browser's developer tools to troubleshoot any issues and make improvements.


### Note: final touches involved
1. Replacing Swedish comments with English ones
2. Increasing redability
3. Removing duplicate code where possible