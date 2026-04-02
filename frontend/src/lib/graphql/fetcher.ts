import axios from 'axios';

type GraphQLErrorPayload = {
  message: string;
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLErrorPayload[];
};

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3001/graphql';

function normalizeHeaders(headers?: RequestInit['headers']): Record<string, string> {
  if (!headers) {
    return {};
  }

  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  return Object.fromEntries(
    Object.entries(headers).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string',
    ),
  );
}

export function fetcher<TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers'],
) {
  return async (): Promise<TData> => {
    const response = await axios.post<
      GraphQLResponse<TData>,
      { data: GraphQLResponse<TData> }
    >(
      GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...normalizeHeaders(headers),
        },
      },
    );

    if (response.data.errors?.length) {
      throw new Error(response.data.errors.map((error) => error.message).join(', '));
    }

    if (!response.data.data) {
      throw new Error('The GraphQL API returned an empty response.');
    }

    return response.data.data;
  };
}
