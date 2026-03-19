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

If relevant, do not forget to edit URL of the GraphQL provided by ISIM. See the files resilmesh-dashboard/src/environments.ts and resilmesh-dashboard/src/environments.prod.ts and change the:

```
graphqlApi: 'http://127.0.0.1:4001/graphql/',
```

to appropiate location of the GraphQL.

To get latest graphql schema from the GraphQL server:

```
npx get-graphql-schema http://localhost:4001/graphql > graphql/schema.graphql
```

To then generate fragments and operation, run:

```
npm run codegen
```

and then running the dashboard by:

```
ng serve
```

The dashboard will then be available at http://localhost:4200/
