// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app directory
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Jest setup file
  testEnvironment: "jest-environment-jsdom", // JSDOM environment
  //   testEnvironment: "jsdom",
  moduleNameMapper: {
    // Mock static file imports (CSS, images, etc.)
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "app/__mocks__/fileMock.js",
  },
  //   preset: "ts-jest",
  //   transform: {
  //     "^.+\\.tsx?$": "ts-jest",
  //   },
  //   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
// jest.config.js
// module.exports = {
//     // ... other configuration options
//     setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Ensure this points to the correct path of your setup file
//   };

module.exports = createJestConfig(customJestConfig);
