import singletonRouter from "next/router";
import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import Upcoming from "../pages/upcoming";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import {
  GetNftCollectionsDocument,
} from "../generated/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { MOCK_COLLECTIONS, waitForQueryToResolve } from "./utils";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

const renderUpcomingScreen = () => {
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
      <Upcoming />
    </MockedProvider>
  );
};

describe("Upcoming", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/upcoming");
  });

  it("it renders without crashing", () => {
    renderUpcomingScreen();
  });

  it("renders each collection", async () => {
    renderUpcomingScreen();
    await act(async () => {
      await waitForQueryToResolve();
    });

    MOCK_COLLECTIONS.forEach((collection) => {
      const collectionButton = screen.getByText(collection.name.toUpperCase());
      expect(collectionButton).toBeInTheDocument();
    });
  });

  it("collection button routes to its collection page", async () => {
    renderUpcomingScreen();
    await act(async () => {
      await waitForQueryToResolve();
    });

    const collection = MOCK_COLLECTIONS[0];

    const collectionButton = screen.getByText(collection.name.toUpperCase());

    fireEvent.click(collectionButton);

    expect(singletonRouter).toMatchObject({
      asPath: `/upcoming/${collection.name.replaceAll(" ", "%20")}`,
    });
  });

  it("renders the back button", () => {
    renderUpcomingScreen();

    const backButton = screen.getByText("BACK");
    expect(backButton).toBeInTheDocument();
  });

  it("the back button routes to the previous page", async () => {
    renderUpcomingScreen();

    const backButton = screen.getByText("BACK");

    fireEvent.click(backButton);

    expect(singletonRouter).toMatchObject({ asPath: "/" });
  });
});
