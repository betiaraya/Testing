import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Tocheckout from "Tocheckout";

// Mock axios
jest.mock("axios");

describe("Tocheckout Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test("renders the checkout button", () => {
    render(<Tocheckout totalprice={100} />);

    // Check if the button is rendered
    const button = screen.getByText("To checkout");
    expect(button).toBeInTheDocument();
  });

  test("displays an alert if totalprice is 0", () => {
    window.alert = jest.fn(); // Mock the alert function

    render(<Tocheckout totalprice={0} />);

    // Simulate click
    const button = screen.getByText("To checkout");
    fireEvent.click(button);

    // Check if alert was called
    expect(window.alert).toHaveBeenCalledWith("pls add sth");
  });

  test("calls the checkout function if totalprice is greater than 0", async () => {
    const mockResponse = {
      data: {
        detail: {
          data: {
            checkout_url: "https://example.com/checkout",
          },
        },
      },
    };

    axios.post.mockResolvedValueOnce(mockResponse);
    delete window.location; // Delete the original location object
    window.location = { replace: jest.fn() }; // Mock location.replace

    render(<Tocheckout totalprice={100} />);

    // Simulate click
    const button = screen.getByText("To checkout");
    fireEvent.click(button);

    // Check if axios was called with correct arguments
    expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:8000/pay", {
      amount: 100,
      rdurl: "http://localhost:5173",
    });

    // Wait for the promise to resolve
    await screen.findByText("To checkout");

    // Check if window.location.replace was called
    expect(window.location.replace).toHaveBeenCalledWith("https://example.com/checkout");
  });
});
