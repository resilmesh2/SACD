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

## Running the backend API for Cytoscape Visualization (for the 'Interactive Visualization' panel)

The server for the visualization backend is in the 'virtualNetCytoscapeBackend' folder.
```
cd virtualNetCytoscapeBackend/
```

and the server is executed with the command.
```
node server.js
```

The Backend API for the Cytoscape visualization will be available at http://localhost:3000
