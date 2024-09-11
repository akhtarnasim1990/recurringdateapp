// DateContext.tsx
"use client"; // Add this line at the top
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface DateContextType {
  selectedDates: Date[];
  setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>;
  showDatePickerModal: boolean;
  setShowDatePickerModal: React.Dispatch<React.SetStateAction<boolean>>;
  showPreviewModal: boolean;
  setShowPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  showRecurringModal: boolean;
  setShowRecurringModal: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

// Create the context with a default value
const DateContext = createContext<DateContextType | undefined>(undefined);

// Custom hook to use the DateContext
export const useDateContext = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
};

// Define the props for the provider component
interface DateProviderProps {
  children: ReactNode;
}

// DateProvider component to provide the context to children
export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
  const [showDatePickerModal, setShowDatePickerModal] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [showRecurringModal, setShowRecurringModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const today = new Date();
  const twoYearsFromNow = new Date(today);
  twoYearsFromNow.setFullYear(today.getFullYear() + 2);

  const [endDate, setEndDate] = useState<Date>(twoYearsFromNow);

  // Provide context value
  const value: DateContextType = {
    selectedDates,
    setSelectedDates,
    showDatePickerModal,
    setShowDatePickerModal,
    showPreviewModal,
    setShowPreviewModal,
    showRecurringModal,
    setShowRecurringModal,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
