# SACD
Situation and network awareness consolidated dashboard

## Running the dashboard

The dashboard can be built in Docker by running:
```
docker compose up -d
```

or can be run manually by first installing the required npm modules:
```
npm install
```

and then running the dashboard by:
```
ng serve
```

The dashboard will then be available at http://localhost:4200/

## Running the JS backend for visualization

The server for the visualization backend is in the 'virtualNetBackend' folder.
```
cd virtualNetBackend/
```

and the server is executed with the command.
```
node server.js
```
