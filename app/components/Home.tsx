"use client"; // Add this line at the top
import React, { MouseEvent } from "react";
import MyModal from "./modal";
import DatePicker from "./DatePicker";
import DatePreview from "./DatePreview";
import { useDateContext } from "../context/DateContext"; // Import the custom hook

const Home: React.FC = () => {
  const {
    selectedDates,
    showDatePickerModal,
    setShowDatePickerModal,
    showPreviewModal,
    setShowPreviewModal,
    showRecurringModal,
    setShowRecurringModal,
    startDate,
    setStartDate,
  } = useDateContext(); // Consume context using the custom hook

  // Handlers to toggle modals
  const handleToggleDatePickerModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowDatePickerModal(!showDatePickerModal);
  };

  const handleToggleDatePickerModalButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowDatePickerModal(!showDatePickerModal);
  };

  const handleTogglePreviewModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowPreviewModal(!showPreviewModal);
  };

  const handleTogglePreviewModalButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPreviewModal(!showPreviewModal);
  };

  const handleToggleRecurringModal = () => {
    setShowRecurringModal(!showRecurringModal);
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-12">
      <button
        className="px-5 py-2 rounded-full bg-blue-500 text-white cursor-pointer transition duration-300 ease-in-out text-lg shadow-md hover:bg-blue-700 hover:shadow-lg hover:translate-y-[-2px]"
        onClick={handleToggleDatePickerModalButton}
      >
        Select Date
      </button>
      <button
        className="px-5 py-2 rounded-full bg-blue-500 text-white cursor-pointer transition duration-300 ease-in-out text-lg shadow-md hover:bg-blue-700 hover:shadow-lg hover:translate-y-[-2px]"
        onClick={handleTogglePreviewModalButton}
      >
        Preview Date
      </button>

      <button
        className="px-5 py-2 rounded-full bg-purple-600 text-white cursor-pointer transition duration-300 ease-in-out text-lg shadow-md hover:bg-purple-800 hover:shadow-lg hover:translate-y-[-2px]"
        onClick={handleToggleRecurringModal}
      >
        Recurring Dates
      </button>

      {/* Date Picker Modal */}
      {showDatePickerModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={handleToggleDatePickerModal}>
          <div className="bg-white p-5 rounded-lg text-center min-w-[300px]" onClick={(e) => e.stopPropagation()}>
            <h3>Select a Date</h3>
            <DatePicker dateValue={startDate} setDateValue={setStartDate} />
            <button
              className="mt-5 px-3 py-1.5 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 ease-in-out hover:bg-blue-700"
              onClick={handleToggleDatePickerModalButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Date Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={handleTogglePreviewModal}>
          <DatePreview selectedDates={selectedDates} />
        </div>
      )}

      {/* Recurring Date Selection Modal */}
      {showRecurringModal && <MyModal onClose={handleToggleRecurringModal} />}
    </div>
  );
};

export default Home;
