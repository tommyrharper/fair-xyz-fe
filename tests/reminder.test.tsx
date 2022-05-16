import singletonRouter from "next/router";
import { fireEvent, render, screen } from "@testing-library/react";
import Reminder from "../pages/upcoming/[name]/reminder";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import {
  CreateReminderDocument,
  NftCollectionType,
} from "../generated/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { MOCK_COLLECTIONS } from "./utils";
import * as mutations from "../generated/graphql";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

const MOCK_EMAIL = "test@test.com";

const renderReminderScreen = () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: CreateReminderDocument,
          },
          result: {
            data: {
              createReminder: {
                __typename: "ReminderType",
                uuid: "mock-uuid-reminder",
                email: MOCK_EMAIL,
                collection: {
                  uuid: MOCK_COLLECTIONS[0].uuid,
                  name: MOCK_COLLECTIONS[0].name,
                  launchDate: MOCK_COLLECTIONS[0].launchDate,
                },
              },
            },
          },
        },
      ]}
      addTypename={true}
    >
      <Reminder collection={MOCK_COLLECTIONS[0] as NftCollectionType} />
    </MockedProvider>
  );
};

const mockUseCreateReminderMutation = () => {
  const mockedMutations = mutations as any;
  const mockCreateReminderMutation = jest.fn();
  jest
    .spyOn(mockedMutations, "useCreateReminderMutation")
    .mockReturnValue([mockCreateReminderMutation, { loading: false }]);

  return mockCreateReminderMutation;
};

describe("Reminder", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/upcoming");
  });

  it("it renders without crashing", () => {
    renderReminderScreen();
  });

  it("it renders the correct title", async () => {
    renderReminderScreen();

    const titleStart = screen.getByText("Get reminded about");
    const titleEnd = screen.getByText("One for All");

    expect(titleStart).toBeInTheDocument();
    expect(titleEnd).toBeInTheDocument();
  });

  it("triggers the reminder mutation on confirm", () => {
    const mockCreateReminderMutation = mockUseCreateReminderMutation();

    renderReminderScreen();

    const emailInput = screen.getByTestId("Email-text-input");
    fireEvent.change(emailInput, { target: { value: MOCK_EMAIL } });

    const agreeCheckBox = screen.getByTestId("agree");
    fireEvent.click(agreeCheckBox);

    const confirmButton = screen.getByTestId("confirm-reminder");
    fireEvent.click(confirmButton);

    expect(mockCreateReminderMutation).toHaveBeenCalledWith({
      variables: {
        email: MOCK_EMAIL,
        collection: MOCK_COLLECTIONS[0].uuid,
      },
    });
  });

  it("does not trigger mutation if no email is given", () => {
    const mockCreateReminderMutation = mockUseCreateReminderMutation();

    renderReminderScreen();

    const agreeCheckBox = screen.getByTestId("agree");
    fireEvent.click(agreeCheckBox);

    const confirmButton = screen.getByTestId("confirm-reminder");
    fireEvent.click(confirmButton);

    expect(mockCreateReminderMutation).not.toHaveBeenCalled();
  });

  it("does not trigger mutation if terms and conditions are not accepted", () => {
    const mockCreateReminderMutation = mockUseCreateReminderMutation();

    renderReminderScreen();

    const emailInput = screen.getByTestId("Email-text-input");
    fireEvent.change(emailInput, { target: { value: MOCK_EMAIL } });

    const confirmButton = screen.getByTestId("confirm-reminder");
    fireEvent.click(confirmButton);

    expect(mockCreateReminderMutation).not.toHaveBeenCalled();
  });

  it("redirects back to upcoming collections after successful confirmation of reminder", () => {
    renderReminderScreen();

    const emailInput = screen.getByTestId("Email-text-input");
    fireEvent.change(emailInput, { target: { value: MOCK_EMAIL } });

    const agreeCheckBox = screen.getByTestId("agree");
    fireEvent.click(agreeCheckBox);

    const confirmButton = screen.getByTestId("confirm-reminder");
    fireEvent.click(confirmButton);

    expect(singletonRouter).toMatchObject({ asPath: "/upcoming" });
  });
});
