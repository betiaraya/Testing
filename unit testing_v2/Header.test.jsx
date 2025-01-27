// Header.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

test("renders Header component with correct text and classes", () => {
  render(<Header />);

  // Check for the header text
  const headerElement = screen.getByText(/Patal Paradise/i);
  expect(headerElement).toBeInTheDocument();

  // Verify the class names
  expect(headerElement).toHaveClass("text-4xl");
  expect(headerElement).toHaveClass("text-black");
  expect(headerElement).toHaveClass("opacity-70");
  expect(headerElement).toHaveClass("font-roboto");
});
