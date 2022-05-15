import singletonRouter from "next/router";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Home", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  it("renders a heading", () => {
    render(<Home />);

    const revealButton = screen.getByText("REVEAL NEW NFTS");

    expect(revealButton).toBeInTheDocument();
  });

  it("renders a upcoming buttons", () => {
    render(<Home />);

    const upcomingButton = screen.getByText("UPCOMING RELEASES");
    expect(upcomingButton).toBeInTheDocument();
  });

  it("reveal buttons routes to the reveal page", async () => {
    render(<Home />);

    const revealButton = screen.getByText("REVEAL NEW NFTS");

    fireEvent.click(revealButton);

    expect(singletonRouter).toMatchObject({ asPath: "/reveal" });
  });

  it("upcoming buttons routes to the upcoming page", async () => {
    render(<Home />);

    const upcomingButton = screen.getByText("UPCOMING RELEASES");

    fireEvent.click(upcomingButton);

    expect(singletonRouter).toMatchObject({ asPath: "/upcoming" });
  });
});
