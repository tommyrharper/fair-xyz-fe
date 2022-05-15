import { NftCollectionType } from "../generated/graphql";

export const MOCK_COLLECTIONS: Omit<
  NftCollectionType,
  "createdAt" | "updatedAt"
>[] = [
  {
    __typename: "NFTCollectionType",
    uuid: "05cac6a4-9c3d-47ce-b6cf-9023f5f6c884",
    name: "One for All",
    launchDate: null,
  },
  {
    __typename: "NFTCollectionType",
    uuid: "a28bd3cc-b023-471b-97e6-2051d3ed216b",
    name: "Beauty Embodied",
    launchDate: null,
  },
  {
    __typename: "NFTCollectionType",
    uuid: "81c63422-a91e-4d96-abe8-e8abcbef6fc1",
    name: "Fair Blockchain Magic",
    launchDate: null,
  },
  {
    __typename: "NFTCollectionType",
    uuid: "ab6a1373-08b7-4132-9f60-f7afcb213cf7",
    name: "The Magic of Japs",
    launchDate: null,
  },
  {
    __typename: "NFTCollectionType",
    uuid: "991df357-bba0-42d6-a22c-5522510c16cc",
    name: "NFT Mania",
    launchDate: "2022-05-17T20:58:23.000Z",
  },
  {
    __typename: "NFTCollectionType",
    uuid: "cd111443-cec7-426b-85eb-080632fe7d7b",
    name: "Crypto frogs",
    launchDate: null,
  },
];

export const waitForQueryToResolve = async () =>
  await new Promise((resolve) => setTimeout(resolve, 0));
