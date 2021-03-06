import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createReminder: ReminderType;
  updateNFTCollection: NftCollectionType;
};


export type MutationCreateReminderArgs = {
  collection: Scalars['String'];
  email: Scalars['String'];
};


export type MutationUpdateNftCollectionArgs = {
  launchDate?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type NftCollectionType = {
  __typename?: 'NFTCollectionType';
  createdAt: Scalars['DateTime'];
  launchDate?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getNFTCollection?: Maybe<NftCollectionType>;
  getNFTCollections: Array<NftCollectionType>;
};


export type QueryGetNftCollectionArgs = {
  name: Scalars['String'];
};

export type ReminderType = {
  __typename?: 'ReminderType';
  collection: NftCollectionType;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['ID'];
};

export type CreateReminderMutationVariables = Exact<{
  email: Scalars['String'];
  collection: Scalars['String'];
}>;


export type CreateReminderMutation = { __typename?: 'Mutation', createReminder: { __typename?: 'ReminderType', uuid: string, email: string, collection: { __typename?: 'NFTCollectionType', uuid: string, name: string, launchDate?: any | null } } };

export type UpdateNftCollectionMutationVariables = Exact<{
  uuid: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  launchDate?: InputMaybe<Scalars['DateTime']>;
}>;


export type UpdateNftCollectionMutation = { __typename?: 'Mutation', updateNFTCollection: { __typename?: 'NFTCollectionType', uuid: string, name: string, launchDate?: any | null } };

export type GetNftCollectionQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetNftCollectionQuery = { __typename?: 'Query', getNFTCollection?: { __typename?: 'NFTCollectionType', uuid: string, name: string, launchDate?: any | null } | null };

export type GetNftCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNftCollectionsQuery = { __typename?: 'Query', getNFTCollections: Array<{ __typename?: 'NFTCollectionType', uuid: string, name: string, launchDate?: any | null }> };


export const CreateReminderDocument = gql`
    mutation CreateReminder($email: String!, $collection: String!) {
  createReminder(email: $email, collection: $collection) {
    uuid
    email
    collection {
      uuid
      name
      launchDate
    }
  }
}
    `;
export type CreateReminderMutationFn = Apollo.MutationFunction<CreateReminderMutation, CreateReminderMutationVariables>;

/**
 * __useCreateReminderMutation__
 *
 * To run a mutation, you first call `useCreateReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReminderMutation, { data, loading, error }] = useCreateReminderMutation({
 *   variables: {
 *      email: // value for 'email'
 *      collection: // value for 'collection'
 *   },
 * });
 */
export function useCreateReminderMutation(baseOptions?: Apollo.MutationHookOptions<CreateReminderMutation, CreateReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReminderMutation, CreateReminderMutationVariables>(CreateReminderDocument, options);
      }
export type CreateReminderMutationHookResult = ReturnType<typeof useCreateReminderMutation>;
export type CreateReminderMutationResult = Apollo.MutationResult<CreateReminderMutation>;
export type CreateReminderMutationOptions = Apollo.BaseMutationOptions<CreateReminderMutation, CreateReminderMutationVariables>;
export const UpdateNftCollectionDocument = gql`
    mutation UpdateNFTCollection($uuid: String!, $name: String, $launchDate: DateTime) {
  updateNFTCollection(uuid: $uuid, name: $name, launchDate: $launchDate) {
    uuid
    name
    launchDate
  }
}
    `;
export type UpdateNftCollectionMutationFn = Apollo.MutationFunction<UpdateNftCollectionMutation, UpdateNftCollectionMutationVariables>;

/**
 * __useUpdateNftCollectionMutation__
 *
 * To run a mutation, you first call `useUpdateNftCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNftCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNftCollectionMutation, { data, loading, error }] = useUpdateNftCollectionMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      name: // value for 'name'
 *      launchDate: // value for 'launchDate'
 *   },
 * });
 */
export function useUpdateNftCollectionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNftCollectionMutation, UpdateNftCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNftCollectionMutation, UpdateNftCollectionMutationVariables>(UpdateNftCollectionDocument, options);
      }
export type UpdateNftCollectionMutationHookResult = ReturnType<typeof useUpdateNftCollectionMutation>;
export type UpdateNftCollectionMutationResult = Apollo.MutationResult<UpdateNftCollectionMutation>;
export type UpdateNftCollectionMutationOptions = Apollo.BaseMutationOptions<UpdateNftCollectionMutation, UpdateNftCollectionMutationVariables>;
export const GetNftCollectionDocument = gql`
    query GetNFTCollection($name: String!) {
  getNFTCollection(name: $name) {
    uuid
    name
    launchDate
  }
}
    `;

/**
 * __useGetNftCollectionQuery__
 *
 * To run a query within a React component, call `useGetNftCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNftCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNftCollectionQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetNftCollectionQuery(baseOptions: Apollo.QueryHookOptions<GetNftCollectionQuery, GetNftCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNftCollectionQuery, GetNftCollectionQueryVariables>(GetNftCollectionDocument, options);
      }
export function useGetNftCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNftCollectionQuery, GetNftCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNftCollectionQuery, GetNftCollectionQueryVariables>(GetNftCollectionDocument, options);
        }
export type GetNftCollectionQueryHookResult = ReturnType<typeof useGetNftCollectionQuery>;
export type GetNftCollectionLazyQueryHookResult = ReturnType<typeof useGetNftCollectionLazyQuery>;
export type GetNftCollectionQueryResult = Apollo.QueryResult<GetNftCollectionQuery, GetNftCollectionQueryVariables>;
export const GetNftCollectionsDocument = gql`
    query GetNFTCollections {
  getNFTCollections {
    uuid
    name
    launchDate
  }
}
    `;

/**
 * __useGetNftCollectionsQuery__
 *
 * To run a query within a React component, call `useGetNftCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNftCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNftCollectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNftCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetNftCollectionsQuery, GetNftCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNftCollectionsQuery, GetNftCollectionsQueryVariables>(GetNftCollectionsDocument, options);
      }
export function useGetNftCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNftCollectionsQuery, GetNftCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNftCollectionsQuery, GetNftCollectionsQueryVariables>(GetNftCollectionsDocument, options);
        }
export type GetNftCollectionsQueryHookResult = ReturnType<typeof useGetNftCollectionsQuery>;
export type GetNftCollectionsLazyQueryHookResult = ReturnType<typeof useGetNftCollectionsLazyQuery>;
export type GetNftCollectionsQueryResult = Apollo.QueryResult<GetNftCollectionsQuery, GetNftCollectionsQueryVariables>;