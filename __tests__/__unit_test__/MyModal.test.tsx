// __tests__/MyModal.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyModal from "../../app/components/modal";
import { useDateContext } from "../../app/context/DateContext";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node, // Mock createPortal to render modal content in the test environment
}));

jest.mock("../../app/context/DateContext", () => ({
  useDateContext: jest.fn(),
}));

describe("MyModal Component", () => {
  const setShowRecurringModal = jest.fn();
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();
  const setSelectedDates = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    (useDateContext as jest.Mock).mockReturnValue({
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-01-31"),
      setStartDate,
      setEndDate,
      setSelectedDates,
      showRecurringModal: true,
      setShowRecurringModal,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal correctly", () => {
    render(<MyModal onClose={mockOnClose} />);

    // Verify that modal title and content are rendered
    expect(screen.getByText("Recurring Date Selector")).toBeInTheDocument();
    expect(screen.getByText("Start Date:")).toBeInTheDocument();
    expect(screen.getByText("End Date:")).toBeInTheDocument();
  });

  it("calls onClose when clicking the Cancel button", () => {
    render(<MyModal onClose={mockOnClose} />);

    // Click the Cancel button
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Verify that onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls handleSave and schedules recurring dates when clicking the Save button", () => {
    render(<MyModal onClose={mockOnClose} />);

    // Click the Save button
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    // Verify that handleSave was called and setSelectedDates is triggered
    expect(setSelectedDates).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("updates the period when changing the period select", () => {
    render(<MyModal onClose={mockOnClose} />);

    // Change the period select
    const periodSelect = screen.getByLabelText("Period:") as HTMLSelectElement;
    fireEvent.change(periodSelect, { target: { value: "weeks" } });

    // Verify that the "Days:" label appears
    expect(screen.getByText("Days:")).toBeInTheDocument();
  });

  it('calls setSelectedDates with correct dates when "days" is selected', () => {
    render(<MyModal onClose={mockOnClose} />);

    // Click the Save button to trigger handleSave
    fireEvent.click(screen.getByText("Save"));

    // Ensure that setSelectedDates is called with an array of dates
    expect(setSelectedDates).toHaveBeenCalledWith(expect.any(Array));
    const dates = setSelectedDates.mock.calls[0][0]; // Extract the dates array passed to setSelectedDates

    // Example: Check that dates include the start date
    expect(dates[0]).toEqual(new Date("2023-01-01"));
  });
});
