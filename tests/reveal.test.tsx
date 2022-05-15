import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Reveal from "../pages/reveal";

describe("Reveal", () => {
  it("renders all 4 reveal images", () => {
    render(<Reveal />);

    const revealImages = screen.getAllByTestId("reveal-image");

    expect(revealImages.length).toBe(4);
  });
});
