// __tests__/DatePreview.test.tsx
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // For jest-dom matchers
import DatePreview from "../../app/components/DatePreview"; // Adjust the import path according to your project structure

// Mock Calendar component
jest.mock("react-calendar", () => ({
  __esModule: true,
  default: ({ tileClassName }: any) => (
    <div>
      {[1, 2, 3].map((day) => (
        <div key={day} className={`react-calendar__tile ${tileClassName && tileClassName({ date: new Date(`2024-01-0${day}`) })}`}>
          {day}
        </div>
      ))}
    </div>
  ),
}));

describe("DatePreview Component", () => {
  it("renders correctly without selected dates", () => {
    // Render the component without any selected dates
    const { container } = render(<DatePreview selectedDates={[]} />);

    // Check if the Calendar component is rendered
    expect(container.querySelector(".react-calendar__tile")).toBeInTheDocument();
  });

  it("applies the 'selected' class to the correct dates", () => {
    // Mock selected dates
    const selectedDates = [new Date("2024-01-01"), new Date("2024-01-02")];

    // Render the component with selected dates
    const { container } = render(<DatePreview selectedDates={selectedDates} />);

    // Get all calendar tiles
    const calendarTiles = container.querySelectorAll(".react-calendar__tile");

    // Check if the tiles corresponding to the selected dates have the "selected" class
    selectedDates.forEach((date) => {
      const tile = Array.from(calendarTiles).find((tile) => tile.classList.contains("selected") && tile.textContent === date.getDate().toString());
      expect(tile).toBeInTheDocument(); // Expect the tile to exist and be selected
    });
  });
});
