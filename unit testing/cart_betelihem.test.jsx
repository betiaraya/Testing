import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "Cart";

describe("Cart Component", () => {
  const mockAddFunction = jest.fn(); // Mock function for add callback
  const cartItems = [
    {
      img: "https://example.com/img1.jpg",
      item: "Apples",
      txt: "Fresh apples",
      price: 50,
      total: 2,
    },
    {
      img: "https://example.com/img2.jpg",
      item: "Oranges",
      txt: "Juicy oranges",
      price: 40,
      total: 3,
    },
  ];

  test("renders the cart items correctly", () => {
    render(<Cart cartitem={cartItems} add={mockAddFunction} items={[]} />);

    // Check if the items are rendered
    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Fresh apples")).toBeInTheDocument();
    expect(screen.getByText("ETB 50/kg")).toBeInTheDocument();

    expect(screen.getByText("Oranges")).toBeInTheDocument();
    expect(screen.getByText("Juicy oranges")).toBeInTheDocument();
    expect(screen.getByText("ETB 40/kg")).toBeInTheDocument();
  });

  test("renders the correct image for each item", () => {
    render(<Cart cartitem={cartItems} add={mockAddFunction} items={[]} />);

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "https://example.com/img1.jpg");
    expect(images[1]).toHaveAttribute("src", "https://example.com/img2.jpg");
  });

  test("calls the add function with correct arguments when buttons are clicked", () => {
    render(<Cart cartitem={cartItems} add={mockAddFunction} items={[]} />);

    // Find buttons
    const addButton = screen.getAllByText("+")[0];
    const subtractButton = screen.getAllByText("-")[0];

    // Simulate button clicks
    fireEvent.click(addButton);
    fireEvent.click(subtractButton);

    // Check if mock function was called with correct arguments
    expect(mockAddFunction).toHaveBeenCalledWith("Apples", "add");
    expect(mockAddFunction).toHaveBeenCalledWith("Apples", "min");
  });

  test("displays the total weight correctly", () => {
    render(<Cart cartitem={cartItems} add={mockAddFunction} items={[]} />);

    // Check if total weights are displayed correctly
    expect(screen.getByText("2kg")).toBeInTheDocument();
    expect(screen.getByText("3kg")).toBeInTheDocument();
  });

  test("handles empty cart gracefully", () => {
    render(<Cart cartitem={[]} add={mockAddFunction} items={[]} />);

    // Ensure no items are rendered
    expect(screen.queryByText("ETB")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });
});
