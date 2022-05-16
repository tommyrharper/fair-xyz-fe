import singletonRouter from "next/router";
import { fireEvent, render, screen } from "@testing-library/react";
import EditCollection from "../pages/upcoming/[name]/edit";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { NftCollectionType } from "../generated/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { MOCK_COLLECTIONS } from "./utils";
import * as mutations from "../generated/graphql";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

const NEW_NAME = "Fair is magical";
const NEW_DATE = "2025-01-01";

const renderEditCollectionScreen = () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: mutations.UpdateNftCollectionDocument,
          },
          result: {
            data: {
              updateNFTCollection: {
                __typename: "NFTCollectionType",
                uuid: MOCK_COLLECTIONS[0].uuid,
                name: NEW_NAME,
                launchDate: MOCK_COLLECTIONS[0].launchDate,
              },
            },
          },
        },
      ]}
      addTypename={true}
    >
      <EditCollection collection={MOCK_COLLECTIONS[0] as NftCollectionType} />
    </MockedProvider>
  );
};

const mockUseUpdateNftCollectionMutation = () => {
  const mockedMutations = mutations as any;
  const mockUpdateNftCollectionMutation = jest.fn();
  jest
    .spyOn(mockedMutations, "useUpdateNftCollectionMutation")
    .mockReturnValue([mockUpdateNftCollectionMutation, { loading: false }]);

  return mockUpdateNftCollectionMutation;
};

describe("EditCollection", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/upcoming");
  });

  it("it renders without crashing", () => {
    renderEditCollectionScreen();
  });

  it("it renders the correct title", async () => {
    renderEditCollectionScreen();

    const titleStart = screen.getByText("Edit");
    const titleEnd = screen.getByText("One for All");

    expect(titleStart).toBeInTheDocument();
    expect(titleEnd).toBeInTheDocument();
  });

  it("renders the back me button", () => {
    renderEditCollectionScreen();

    const backButton = screen.getByText("BACK");
    expect(backButton).toBeInTheDocument();
  });

  it("the back button routes to the previous page", async () => {
    renderEditCollectionScreen();

    const backButton = screen.getByText("BACK");

    fireEvent.click(backButton);

    expect(singletonRouter).toMatchObject({
      asPath: "/upcoming/One%20for%20All",
    });
  });

  describe("triggers update collection mutation on update", () => {
    it("and updates changed name", () => {
      const mockCreateEditCollectionMutation =
        mockUseUpdateNftCollectionMutation();

      renderEditCollectionScreen();

      const nameInput = screen.getByTestId("Name-text-input");
      fireEvent.change(nameInput, { target: { value: NEW_NAME } });

      const updateButton = screen.getByText("UPDATE");
      fireEvent.click(updateButton);

      expect(mockCreateEditCollectionMutation).toHaveBeenCalledWith({
        variables: {
          uuid: MOCK_COLLECTIONS[0].uuid,
          name: NEW_NAME,
        },
      });
    });

    it("and updates changed date", () => {
      const mockCreateEditCollectionMutation =
        mockUseUpdateNftCollectionMutation();

      renderEditCollectionScreen();

      const dateInput = screen.getByTestId("date-input");
      fireEvent.change(dateInput, { target: { value: "2025-01-01" } });

      const updateButton = screen.getByText("UPDATE");
      fireEvent.click(updateButton);

      expect(mockCreateEditCollectionMutation).toHaveBeenCalledWith({
        variables: {
          uuid: MOCK_COLLECTIONS[0].uuid,
          launchDate: NEW_DATE,
        },
      });
    });

    it("and updates changed name and date", () => {
      const mockCreateEditCollectionMutation =
        mockUseUpdateNftCollectionMutation();

      renderEditCollectionScreen();

      const nameInput = screen.getByTestId("Name-text-input");
      fireEvent.change(nameInput, { target: { value: NEW_NAME } });

      const dateInput = screen.getByTestId("date-input");
      fireEvent.change(dateInput, { target: { value: "2025-01-01" } });

      const updateButton = screen.getByText("UPDATE");
      fireEvent.click(updateButton);

      expect(mockCreateEditCollectionMutation).toHaveBeenCalledWith({
        variables: {
          uuid: MOCK_COLLECTIONS[0].uuid,
          name: NEW_NAME,
          launchDate: NEW_DATE,
        },
      });
    });

    it("and clears nullified date", () => {
      const mockCreateEditCollectionMutation =
        mockUseUpdateNftCollectionMutation();

      renderEditCollectionScreen();

      const dateInput = screen.getByTestId("date-input");
      fireEvent.change(dateInput, { target: { value: NEW_DATE } });
      fireEvent.change(dateInput, { target: { value: "" } });

      const updateButton = screen.getByText("UPDATE");
      fireEvent.click(updateButton);

      expect(mockCreateEditCollectionMutation).toHaveBeenCalledWith({
        variables: {
          uuid: MOCK_COLLECTIONS[0].uuid,
          launchDate: null,
        },
      });
    });

    it("and redirects back to upcoming collections on successful update", () => {
      renderEditCollectionScreen();

      const nameInput = screen.getByTestId("Name-text-input");
      fireEvent.change(nameInput, { target: { value: NEW_NAME } });

      const updateButton = screen.getByText("UPDATE");
      fireEvent.click(updateButton);

      expect(singletonRouter).toMatchObject({ asPath: "/upcoming" });
    });
  });

  describe("does not trigger update collection mutation on update", () => {
    it("if name is an empty string", () => {
      const mockCreateEditCollectionMutation =
        mockUseUpdateNftCollectionMutation();

      renderEditCollectionScreen();

      const nameInput = screen.getByTestId("Name-text-input");
      fireEvent.change(nameInput, { target: { value: "" } });

      const updateButton = screen.getByText("UPDATE");
      fireEvent.click(updateButton);

      expect(mockCreateEditCollectionMutation).not.toHaveBeenCalled();
    });
  });
});
