# Project README

## Overview

This project is built with Next.js, TypeScript, and Tailwind CSS. It features a set of components designed to handle recurrence options, date selection, and a preview. The application leverages the Context API for state management and includes comprehensive unit and integration tests to ensure reliability.

## Table of Contents

- [Project README](#project-readme)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Components](#components)
  - [Technology Stack](#technology-stack)
  - [Installation](#installation)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
    - [Runtime Dependencies](#runtime-dependencies)
    - [Development Dependencies](#development-dependencies)
  - [Future Improvements](#future-improvements)

## Components

- **Recurrence Options**: Allows users to select from various recurrence patterns such as Daily, Weekly, Monthly, and Yearly. It also supports customization options like specifying intervals (e.g., Every X days/weeks/months/years), selecting specific days of the week, and choosing the nth day of the month (e.g., the second Tuesday).

- **Date Picker**: Provides a user-friendly interface for selecting dates. This component integrates with `react-calendar` and `react-date-picker` to offer a smooth date selection experience.

- **Preview**: Displays a summary of the selected recurrence options and chosen dates. This component helps users visualize their choices before finalizing.

- **Home Component**: Integrates the above components into a cohesive user interface, enabling seamless interaction between recurrence options, date selection, and preview.

## Technology Stack

- **Next.js**: A React framework for server-rendered applications.
- **TypeScript**: Adds static types to JavaScript, improving code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone git@github.com:akhtarnasim1990/recurringdateapp.git
cd recurringdateapp
npm install
```

## Scripts

The following npm scripts are available:

- `dev`: Start the development server.

  ```bash
  npm run dev
  ```

- `build`: Build the project for production.

  ```bash
  npm run build
  ```

- `start`: Start the production server.

  ```bash
  npm run start
  ```

- `lint`: Run linting to check for code quality issues.

  ```bash
  npm run lint
  ```

- `test`: Run unit tests.

  ```bash
  npm run test
  ```

- `test:watch`: Run unit tests in watch mode.

  ```bash
  npm run test:watch
  ```

- `test:coverage`: Run unit tests and generate a coverage report.
  ```bash
  npm run test:coverage
  ```

## Dependencies

### Runtime Dependencies

- `moment`: Date and time manipulation library.
- `next`: React framework for server-rendered applications.
- `react`: JavaScript library for building user interfaces.
- `react-calendar`: Calendar component for React.
- `react-date-picker`: Date picker component for React.
- `react-dom`: React's DOM rendering package.

### Development Dependencies

- `@testing-library/jest-dom`: Custom matchers for Jest to test the DOM.
- `@testing-library/react`: Utilities for testing React components.
- `@testing-library/user-event`: Simulates user events in tests.
- `@types/jest`: TypeScript definitions for Jest.
- `@types/node`: TypeScript definitions for Node.js.
- `@types/react`: TypeScript definitions for React.
- `@types/react-dom`: TypeScript definitions for ReactDOM.
- `canvas`: Required for some testing configurations.
- `eslint`: JavaScript linter for code quality.
- `eslint-config-next`: ESLint configuration for Next.js.
- `jest`: JavaScript testing framework.
- `jest-environment-jsdom`: Jest environment for running tests in a simulated browser environment.
- `postcss`: Tool for transforming CSS with JavaScript plugins.
- `tailwindcss`: Utility-first CSS framework.
- `ts-jest`: TypeScript preprocessor for Jest.
- `typescript`: TypeScript language.

## Future Improvements

- **Date Range**: Introduce functionality to allow users to set a start date and an optional end date for the recurrence. This enhancement would provide greater flexibility in defining recurring events and schedules.

---

For any questions or support, please contact [akhtar.nasim1990@gmail.com].
