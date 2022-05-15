import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
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
});
