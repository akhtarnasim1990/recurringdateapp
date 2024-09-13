import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../app/components/Home";
import { DateProvider } from "../../app/context/DateContext";

beforeEach(() => {
  // Create a div with id 'modal-root' and append it to the document body
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  // Clean up the modal root after each test
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe("Home Component Integration Test", () => {
  test("should interact with DatePicker and MyModal components", async () => {
    // Render Home component within DateProvider
    render(
      <DateProvider>
        <Home />
      </DateProvider>
    );

    // Check if SelectDate modal is not present initially
    expect(screen.queryByTestId("select-date-modal-overlay")).not.toBeInTheDocument();

    // // Click the "Preview Date" button
    fireEvent.click(screen.getByRole("button", { name: /Select Date/i }));

    // Wait for the SelectDate modal to appear
    await waitFor(() => {
      expect(screen.getByTestId("select-date-modal-overlay")).toBeInTheDocument();
    });

    // Click outside the SelectDate modal to close it
    fireEvent.click(screen.getByTestId("select-date-modal-overlay"));

    // Ensure the SelectDate modal is no longer present
    await waitFor(() => {
      expect(screen.queryByTestId("select-date-modal-overlay")).not.toBeInTheDocument();
    });

    // Check if DatePreview modal is not present initially
    expect(screen.queryByTestId("date-preview-modal-overlay")).not.toBeInTheDocument();

    // // Click the "Preview Date" button
    fireEvent.click(screen.getByText("Preview Date"));

    // Wait for the DatePreview modal to appear
    await waitFor(() => {
      expect(screen.getByTestId("date-preview-modal-overlay")).toBeInTheDocument();
    });

    // Click outside the DatePreview modal to close it
    fireEvent.click(screen.getByTestId("date-preview-modal-overlay"));

    // Ensure the DatePreview modal is no longer present
    await waitFor(() => {
      expect(screen.queryByTestId("date-preview-modal-overlay")).not.toBeInTheDocument();
    });

    // // Click the "Recurring Dates" button
    fireEvent.click(screen.getByRole("button", { name: /Recurring Dates/i }));

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
    });

    // Interact with MyModal
    fireEvent.change(screen.getByLabelText(/Number:/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/Period:/i), { target: { value: "weeks" } });

    // Click on save also closes the modal
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    // Ensure the MyModal modal is no longer in the document
    await waitFor(() => {
      expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
    });
  });
});
