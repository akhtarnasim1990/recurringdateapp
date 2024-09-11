// Datepicker.tsx
"use client"; // Add this line at the top
import React from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

// Define the props type for the Datepicker component
interface DatepickerProps {
  dateValue: Date;
  setDateValue: React.Dispatch<React.SetStateAction<Date>>;
}

// Datepicker component
const Datepicker: React.FC<DatepickerProps> = ({ dateValue, setDateValue }) => {
  const handleChange = (value: Date | [Date | null, Date | null] | null) => {
    // Check if value is a single Date object
    if (value instanceof Date) {
      setDateValue(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      // If value is a range, handle the first Date object in the range
      setDateValue(value[0]);
    }
  };
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DatePicker onChange={handleChange} value={dateValue} />
    </div>
  );
};

export default Datepicker;
