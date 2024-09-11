<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# Project README

## Overview

This project is built with Next.js, TypeScript, and Tailwind CSS. It features a set of components designed to handle recurrence options, date selection, and a preview. The application leverages the Context API for state management and includes comprehensive unit and integration tests to ensure reliability.

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
git clone <repository-url>
cd <project-directory>
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
