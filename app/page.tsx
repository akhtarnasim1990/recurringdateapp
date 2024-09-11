"use client"; // Add this line at the top
import React from "react";
import Home from "./components/Home"; // Adjust the path as necessary
import { DateProvider } from "./context/DateContext"; // Import the provider

const App: React.FC = () => {
  return (
    <DateProvider>
      <Home />
    </DateProvider>
  );
};

export default App;
