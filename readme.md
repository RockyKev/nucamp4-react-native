## how to load android emulator

1. Start Android Studio

2. in the terminal -

Try with
expo start --lan

expo start

## How to start the JSON server

1. Access the json-server folder

2. Make sure your IP Address is the same in the shared/baseURL.js

3. In the terminal
   json-server --watch db.json -p 3001 -d 2000

More info here: https://learn.nucamp.co/mod/book/view.php?id=1262&chapterid=1742

Additional support:
json-server --watch db.json -p 3001 -d 2000 -H <your computer's IP address here - the same one as in your baseUrl.js file>
