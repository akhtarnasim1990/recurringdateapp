import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../app/components/Home";
import { DateProvider } from "../../app/context/DateContext"; // Adjust import as needed

describe("Home Component Integration Test", () => {
  test("should interact with DatePicker and MyModal components", async () => {
    // Render Home component within DateProvider
    render(
      <DateProvider>
        <Home />
      </DateProvider>
    );

    // Click the "Preview Date" button
    fireEvent.click(screen.getByText("Preview Date"));

    // Wait for the DatePreview modal to appear
    await waitFor(() => {
      // Adjust the query to match the actual content of your DatePreview modal
      expect(screen.getByText(/Preview Date/i)).toBeInTheDocument();
    });

    // Close the DatePreview modal
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));

    // Ensure the DatePreview modal is no longer in the document
    await waitFor(() => {
      expect(screen.queryByText(/Date Preview/i)).not.toBeInTheDocument();
    });

    // Click the "Recurring Dates" button
    fireEvent.click(screen.getByText("Recurring Dates"));

    // Wait for the MyModal modal to appear
    await waitFor(() => {
      expect(screen.getByText(/Recurring Date Selector/i)).toBeInTheDocument();
    });

    // Interact with MyModal
    fireEvent.change(screen.getByLabelText(/Number:/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/Period:/i), { target: { value: "weeks" } });
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    // Ensure the MyModal modal is no longer in the document
    await waitFor(() => {
      expect(screen.queryByText(/Recurring Date Selector/i)).not.toBeInTheDocument();
    });
  });
});
