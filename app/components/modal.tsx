"use client"; // Add this line at the top
import React, { useState, useEffect, ChangeEvent } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import DatePicker from "./DatePicker";
import { useDateContext } from "../context/DateContext"; // Import the custom hook

// Define the props type for the MyModal component
interface MyModalProps {
  onClose: () => void;
}

type RecurrencePattern = "days" | "weeks" | "months" | "years";

// MyModal component
const MyModal: React.FC<MyModalProps> = ({ onClose }) => {
  const { startDate, setStartDate, endDate, setEndDate, setSelectedDates, showRecurringModal } = useDateContext();
  const [setRecurDate, isOpen] = [setSelectedDates, showRecurringModal];
  const [number, setNumber] = useState<string>("1");
  const [period, setPeriod] = useState<RecurrencePattern>("days");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [monthDay, setMonthDay] = useState<number | undefined>();
  const [isNtheWeek, setIsNtheWeek] = useState<boolean>(false);
  const [nthWeekday, setNthWeekday] = useState<{ nth: number; weekday: number }>({
    nth: 1,
    weekday: 1,
  });

  const days = [
    { name: "Mon", number: 1 },
    { name: "Tue", number: 2 },
    { name: "Wed", number: 3 },
    { name: "Thu", number: 4 },
    { name: "Fri", number: 5 },
    { name: "Sat", number: 6 },
    { name: "Sun", number: 0 },
  ];

  useEffect(() => {
    const newDate = new Date(startDate);
    setMonthDay(newDate.getDate());
  }, [startDate]);

  useEffect(() => {
    if (period === "months" || period === "years") {
      const nth = getNth(startDate);
      setNthWeekday({
        nth,
        weekday: startDate.getDay(),
      });
    }
  }, [period, startDate]);

  const handleCheckboxChange = (day: number) => {
    setSelectedDays((prevDays) => (prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]));
  };

  interface ScheduleOptions {
    startDate: Date;
    endDate: Date;
    recurrencePattern: RecurrencePattern;
    interval: number;
    daysOfWeek?: number[]; // Array of numbers representing days of the week (0 = Sunday, 1 = Monday, etc.)
    monthDay?: number;
    nthWeekday?: { nth: number; weekday: number };
    isNtheWeek?: boolean;
  }

  function scheduleRecurringMeetings({
    startDate,
    endDate,
    recurrencePattern,
    interval,
    daysOfWeek = [],
    monthDay = 1,
    nthWeekday = { nth: 1, weekday: 1 },
    isNtheWeek = false,
  }: ScheduleOptions): Date[] {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid start or end date.");
    }

    if (start > end) {
      throw new Error("End date must be after the start date.");
    }

    // Helper functions to manipulate dates
    const addDays = (date: Date, days: number): Date => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    };

    const addMonths = (date: Date, months: number, monthDay: number): Date => {
      const newDate = new Date(date);
      const dayOfMonth = newDate.getDate();
      const targetMonth = newDate.getMonth() + months;
      newDate.setMonth(targetMonth);
      // newDate.setDate(monthDay);
      console.log("beore------", newDate);
      // Adjust for the last day of the target month
      if (newDate.getDate() !== dayOfMonth) {
        newDate.setDate(0); // Set to the last day of the previous month
      } else if (monthDay > newDate.getDate()) {
        newDate.setDate(monthDay);
      }
      console.log("after - - - - - -", newDate);
      return newDate;
    };

    const addYears = (date: Date, years: number): Date => {
      const newDate = new Date(date);
      newDate.setFullYear(newDate.getFullYear() + years);
      return newDate;
    };

    const getNthWeekdayOfMonth = (year: number, month: number, nth: number, weekday: number): Date => {
      const firstDayOfMonth = new Date(year, month, 1);
      const firstDayWeekday = firstDayOfMonth.getDay();

      const firstWeekdayOffset = (7 + weekday - firstDayWeekday) % 7;
      const firstOccurrenceDate = 1 + firstWeekdayOffset;
      const nthWeekdayDate = firstOccurrenceDate + (nth - 1) * 7;
      let resultDate = new Date(year, month, nthWeekdayDate);

      if (resultDate.getMonth() !== month) {
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const lastDayWeekday = lastDayOfMonth.getDay();
        const daysFromLast = (7 + lastDayWeekday - weekday) % 7;
        resultDate = new Date(year, month, lastDayOfMonth.getDate() - daysFromLast);
      }

      return resultDate;
    };

    const dates: Date[] = [];
    let currentDate = new Date(start);
    let nthDate = new Date(start);

    while (currentDate <= end) {
      switch (recurrencePattern) {
        case "days":
          dates.push(new Date(currentDate));
          currentDate = addDays(currentDate, interval);
          break;

        case "weeks":
          if (daysOfWeek.includes(currentDate.getDay())) {
            dates.push(new Date(currentDate));
          }
          currentDate = addDays(currentDate, 1);
          if (currentDate.getDay() === 0) {
            currentDate = addDays(currentDate, (interval - 1) * 7);
          }
          break;

        case "months":
          if (!isNtheWeek) {
            // if (currentDate.getDate() === monthDay) {

            // }
            dates.push(new Date(currentDate));
            currentDate = addMonths(currentDate, interval, monthDay);
          } else {
            dates.push(new Date(nthDate));
            currentDate = addMonths(currentDate, interval, monthDay);
            nthDate = getNthWeekdayOfMonth(currentDate.getFullYear(), currentDate.getMonth(), nthWeekday.nth, nthWeekday.weekday);
          }
          break;

        case "years":
          if (currentDate.getMonth() === start.getMonth() && currentDate.getDate() === start.getDate()) {
            dates.push(new Date(currentDate));
          }
          currentDate = addYears(currentDate, interval);
          break;

        default:
          throw new Error("Invalid recurrence pattern. Use 'days', 'weeks', 'months', or 'years'.");
      }
    }

    return dates;
  }

  const handleSave = () => {
    const result = scheduleRecurringMeetings({
      startDate,
      endDate,
      recurrencePattern: period,
      interval: +number,
      daysOfWeek: selectedDays,
      monthDay: monthDay!,
      nthWeekday,
      isNtheWeek,
    });

    setRecurDate(result);
    onClose();
  };

  const handlePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value as RecurrencePattern);
  };

  const getNth = (date: Date): number => {
    const x = Math.floor(date.getDate() / 7);
    const y = date.getDate() % 7 > 0 ? 1 : 0;
    return x + y;
  };

  const getNthDay = (date: Date): string => {
    const nth = getNth(date);
    return nth === 1 ? "1st" : nth === 2 ? "2nd" : nth === 3 ? "3rd" : `${nth}th`;
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-y-auto"
      onClick={onClose}
      data-testid="modal-overlay"
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Recurring Date Selector</h2>
        <div className="mb-4">
          <div className="mb-4 text-left">
            <label className="block font-bold mb-1">Start Date:</label>
            <DatePicker dateValue={startDate} setDateValue={setStartDate} />
          </div>
          <div className="mb-4 text-left">
            <label className="block font-bold mb-1" htmlFor="number">
              Number:
            </label>
            <select id="number" className="w-full p-2 border rounded-md" value={number} onChange={(e) => setNumber(e.target.value)}>
              {Array.from({ length: 99 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="period-select" className="block font-bold mb-1">
              Period:
            </label>
            <select id="period-select" className="w-full p-2 border rounded-md" value={period} onChange={handlePeriodChange}>
              <option value="days">Day</option>
              <option value="weeks">Week</option>
              <option value="months">Month</option>
              <option value="years">Year</option>
            </select>
          </div>
          {period === "weeks" && (
            <div className="mb-4 text-left">
              <label className="block font-bold mb-1">Days:</label>
              {days.map((day) => (
                <label key={day.number} className="inline-block mr-4 cursor-pointer">
                  <input
                    type="checkbox"
                    value={day.number}
                    checked={selectedDays.includes(day.number)}
                    onChange={() => handleCheckboxChange(day.number)}
                  />
                  {day.name}
                </label>
              ))}
            </div>
          )}
          {(period === "months" || period === "years") && (
            <div className="mb-4 text-left flex flex-col">
              <label>
                <input type="radio" checked={!isNtheWeek} onChange={() => setIsNtheWeek(false)} />
                On the day {startDate.getDate()}
              </label>
              <label>
                <input type="radio" checked={isNtheWeek} onChange={() => setIsNtheWeek(true)} />
                On the {getNthDay(startDate)} {moment(startDate).format("dddd")} {period === "years" ? `of ${moment(startDate).format("MMMM")}` : ""}
              </label>
            </div>
          )}
          <div className="text-left mb-4">
            <p>
              Occurs every {number} {period} until
            </p>
          </div>
          <div className="mb-4 text-left">
            <label className="block font-bold mb-1">End Date:</label>
            <DatePicker dateValue={endDate} setDateValue={setEndDate} />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handleSave}>
            Save
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default MyModal;
