
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/schema.graphql",
  documents: ['./src/app/**/*.graphql', '!src/app/graphql/**/*.graphql'],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "fragment-matcher", "typescript-apollo-angular"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
