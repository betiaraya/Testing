import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Total from "./total";

describe("Total Component", () => {
  const cartItems = [
    {
      img: "https://example.com/img1.jpg",
      item: "Apples",
      price: 50,
      total: 2,
    },
    {
      img: "https://example.com/img2.jpg",
      item: "Oranges",
      price: 40,
      total: 3,
    },
  ];

  test("renders the header", () => {
    render(<Total cartitem={[]} />);

    // Check if the header content is rendered
    expect(screen.getByText("Grocery Web App")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("search items")).toBeInTheDocument();
    expect(screen.getByText("Fresh groceries delivered to your door!")).toBeInTheDocument();
  });

  test("displays the total price correctly", () => {
    render(<Total cartitem={cartItems} />);

    // Open the sliding panel
    fireEvent.click(screen.getByText("|||"));

    // Check the total price
    expect(screen.getByText("total: 220 ETB")).toBeInTheDocument();
  });

  test("displays individual cart items correctly", () => {
    render(<Total cartitem={cartItems} />);

    // Open the sliding panel
    fireEvent.click(screen.getByText("|||"));

    // Check if items are rendered
    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("100 ETB")).toBeInTheDocument(); // 50 * 2
    expect(screen.getByText("Oranges")).toBeInTheDocument();
    expect(screen.getByText("120 ETB")).toBeInTheDocument(); // 40 * 3
  });

  test("shows 'nothing to show' when cart is empty", () => {
    render(<Total cartitem={[]} />);

    // Open the sliding panel
    fireEvent.click(screen.getByText("|||"));

    // Check for empty cart message
    expect(screen.getByText("nothing to show")).toBeInTheDocument();
  });

  test("toggles the sliding panel when button is clicked", () => {
    render(<Total cartitem={[]} />);

    const toggleButton = screen.getByText("|||");

    // Initially, the panel should not be visible
    expect(screen.queryByText("nothing to show")).not.toBeInTheDocument();

    // Open the panel
    fireEvent.click(toggleButton);
    expect(screen.getByText("nothing to show")).toBeInTheDocument();

    // Close the panel
    fireEvent.click(screen.getByText("close"));
    expect(screen.queryByText("nothing to show")).not.toBeInTheDocument();
  });

  test("renders the checkout button with correct total price", () => {
    render(<Total cartitem={cartItems} />);

    // Open the sliding panel
    fireEvent.click(screen.getByText("|||"));

    // Check if the checkout button is rendered
    expect(screen.getByText("To checkout")).toBeInTheDocument();
  });
});
