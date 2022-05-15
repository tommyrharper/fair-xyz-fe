import singletonRouter from "next/router";
import { fireEvent, render, screen } from "@testing-library/react";
import Collection from "../pages/upcoming/[name]";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import {
  GetNftCollectionsDocument,
  NftCollectionType,
} from "../generated/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { MOCK_COLLECTIONS } from "./utils";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

const renderCollectionScreen = () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: GetNftCollectionsDocument,
          },
          result: {
            data: {
              getNFTCollections: MOCK_COLLECTIONS,
            },
          },
        },
      ]}
      addTypename={true}
    >
      <Collection collection={MOCK_COLLECTIONS[0] as NftCollectionType} />
    </MockedProvider>
  );
};

describe("Collection", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/upcoming");
  });

  it("it renders without crashing", () => {
    renderCollectionScreen();
  });

  it("renders the back me button", () => {
    renderCollectionScreen();

    const backButton = screen.getByText("BACK");
    expect(backButton).toBeInTheDocument();
  });

  it("renders the remind me button", () => {
    renderCollectionScreen();

    const remindButton = screen.getByText("REMIND ME");
    expect(remindButton).toBeInTheDocument();
  });

  it("renders the edit me button", () => {
    renderCollectionScreen();

    const editButton = screen.getByText("EDIT");
    expect(editButton).toBeInTheDocument();
  });

  it("the back button routes to the previous page", async () => {
    renderCollectionScreen();

    const backButton = screen.getByText("BACK");

    fireEvent.click(backButton);

    expect(singletonRouter).toMatchObject({ asPath: "/upcoming" });
  });

  it("the remind me button routes to the reminder me page", async () => {
    renderCollectionScreen();

    const remindButton = screen.getByText("REMIND ME");

    fireEvent.click(remindButton);

    expect(singletonRouter).toMatchObject({
      asPath: "/upcoming/One%20for%20All/reminder",
    });
  });

  it("the edit button routes to the edit page", async () => {
    renderCollectionScreen();

    const editButton = screen.getByText("EDIT");

    fireEvent.click(editButton);

    expect(singletonRouter).toMatchObject({
      asPath: "/upcoming/One%20for%20All/edit",
    });
  });
});
