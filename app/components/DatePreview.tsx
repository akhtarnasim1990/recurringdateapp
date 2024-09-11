// DatePreview.tsx
"use client"; // Add this line at the top
import React from "react";
import Calendar from "react-calendar";

// Define the props type for the DatePreview component
interface DatePreviewProps {
  //   value: Date; // If you need this prop (assuming from context), type it as Date
  selectedDates: Date[];
}

// DatePreview component
const DatePreview: React.FC<DatePreviewProps> = ({ selectedDates }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Calendar
        tileClassName={({ date }: { date: Date }) =>
          selectedDates.find((d) => d.toDateString() === date.toDateString())
            ? "selected" // Add a custom class to selected dates
            : ""
        }
      />
    </div>
  );
};

export default DatePreview;
