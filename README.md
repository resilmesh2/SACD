# SACD — Situation and Network Awareness Consolidated Dashboard

An Angular dashboard for visualising and managing network assets, subnets, organisation units, and vulnerabilities.

## Running with Docker

```bash
docker compose up -d
```

The dashboard will be available at http://localhost:4200/

## Running manually

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Configure the ISIM GraphQL API endpoint in `src/environments/environment.ts` (and `environment.prod.ts` for production builds):

```typescript
graphqlApi: 'http://127.0.0.1:4001/graphql/',
```

If the GraphQL schema has changed, fetch the latest and regenerate types:

```bash
npx get-graphql-schema http://localhost:4001/graphql > graphql/schema.graphql
npm run codegen
```

Start the dev server:

```bash
npx ng serve
```

The dashboard will be available at http://localhost:4200/

## Development

| Command             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `npm run codegen`   | Regenerate GraphQL types after schema or query changes |
| `npm run fmt:check` | Check formatting with oxfmt                            |
| `npm run fmt`       | Format code with oxfmt                                 |
| `npm run lint`      | Run oxlint                                             |
