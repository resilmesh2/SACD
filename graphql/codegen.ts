import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql/schema.graphql',
  documents: ['./src/app/**/*.graphql'],
  generates: {
    // Central base types — imported by all generated files
    'src/generated/base-types.ts': {
      plugins: ['typescript'],
    },
    // Apollo fragment matcher for cache
    'src/generated/fragment-matcher.ts': {
      plugins: ['fragment-matcher'],
    },
    // Named operations object for type-safe operation name strings
    'src/generated/named-operations.ts': {
      plugins: ['named-operations-object'],
    },
    // Introspection JSON (keep existing)
    './graphql/graphql.schema.json': {
      plugins: ['introspection'],
    },
    // Near-operation-file: generates *.generated.ts next to each *.graphql
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'generated/base-types',
        importTypesNamespace: 'SchemaTypes',
        extension: '.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-apollo-angular'],
      config: {
        querySuffix: 'QueryService',
        mutationSuffix: 'MutationService',
        dedupeFragments: true,
      },
    },
  },
};

export default config;
