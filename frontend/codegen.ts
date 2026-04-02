import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/src/graphql/schema.gql',
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        exposeFetcher: true,
        addInfiniteQuery: false,
        fetcher: '../lib/graphql/fetcher#fetcher',
        scalars: {
          ID: 'number',
        },
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
