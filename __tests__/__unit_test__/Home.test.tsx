// __tests__/Home.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../app/components/Home"; // Adjust the import path according to your project structure
import { useDateContext } from "../../app/context/DateContext";

// Mock useDateContext to control the context values in tests
jest.mock("../../app/context/DateContext", () => ({
  useDateContext: jest.fn(),
}));

describe("Home Component", () => {
  const mockSetShowDatePickerModal = jest.fn();
  const mockSetShowPreviewModal = jest.fn();
  const mockSetShowRecurringModal = jest.fn();
  const mockSetStartDate = jest.fn();

  const mockContextValue = {
    selectedDates: [new Date("2024-01-01")],
    showDatePickerModal: false,
    setShowDatePickerModal: mockSetShowDatePickerModal,
    showPreviewModal: false,
    setShowPreviewModal: mockSetShowPreviewModal,
    showRecurringModal: false,
    setShowRecurringModal: mockSetShowRecurringModal,
    startDate: new Date("2024-01-01"),
    setStartDate: mockSetStartDate,
  };

  beforeEach(() => {
    // Mock the context hook to return the mock context value
    (useDateContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(<Home />);

    // Check if the buttons are rendered
    expect(screen.getByText("Preview Date")).toBeInTheDocument();
    expect(screen.getByText("Recurring Dates")).toBeInTheDocument();
  });

  it("toggles the Preview Modal when the button is clicked", () => {
    render(<Home />);

    const previewButton = screen.getByText("Preview Date");

    // Click the preview button
    fireEvent.click(previewButton);

    // Expect the setShowPreviewModal function to have been called
    expect(mockSetShowPreviewModal).toHaveBeenCalledWith(true);
  });

  it("toggles the Recurring Modal when the button is clicked", () => {
    render(<Home />);

    const recurringButton = screen.getByText("Recurring Dates");

    // Click the recurring button
    fireEvent.click(recurringButton);

    // Expect the setShowRecurringModal function to have been called
    expect(mockSetShowRecurringModal).toHaveBeenCalledWith(true);
  });

  it("opens and closes the DatePicker Modal correctly", () => {
    // Mock context to simulate the DatePicker modal being open
    (useDateContext as jest.Mock).mockReturnValue({
      ...mockContextValue,
      showDatePickerModal: true,
    });

    render(<Home />);

    // Check if the DatePicker modal is displayed
    expect(screen.getByText("Select a Date")).toBeInTheDocument();

    // Find the "Close" button
    const closeButton = screen.getByText("Close");

    // Click the close button
    fireEvent.click(closeButton);

    // Expect the setShowDatePickerModal function to have been called
    expect(mockSetShowDatePickerModal).toHaveBeenCalledWith(false);
  });
});
