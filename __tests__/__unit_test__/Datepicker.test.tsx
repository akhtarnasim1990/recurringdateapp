// __tests__/Datepicker.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Updated: Import userEvent for simulating events
import "@testing-library/jest-dom"; // Correct import for jest-dom matchers
import Datepicker from "../../app/components/DatePicker";

// Mock DatePicker component
jest.mock("react-date-picker", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <button
      onClick={() => onChange(new Date("2024-01-01"))} // Simulate a date change
    >
      Select Date
    </button>
  ),
}));

describe("Datepicker Component", () => {
  it("renders correctly with the initial date value", () => {
    const mockSetDateValue = jest.fn();
    const initialDate = new Date("2024-01-01");

    render(<Datepicker dateValue={initialDate} setDateValue={mockSetDateValue} />);

    // Check if the DatePicker button is rendered
    expect(screen.getByText("Select Date")).toBeInTheDocument();
  });

  it("calls setDateValue with the new date when DatePicker changes", async () => {
    const mockSetDateValue = jest.fn();
    const initialDate = new Date("2024-01-01");

    render(<Datepicker dateValue={initialDate} setDateValue={mockSetDateValue} />);

    // Simulate a date change
    const datePickerButton = screen.getByText("Select Date");
    await userEvent.click(datePickerButton); // Use userEvent to simulate the click

    // Check if setDateValue was called with the new date
    expect(mockSetDateValue).toHaveBeenCalledWith(new Date("2024-01-01"));
  });
});
