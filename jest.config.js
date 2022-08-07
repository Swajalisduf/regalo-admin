module.exports = {
    roots: ["<rootDir>/js"],
    rootDir: "./resources",
    collectCoverageFrom: [
        "js/**/*.{js,jsx,ts,tsx}",
        "!js/**/*.d.ts",
        "!js/mocks/**",
    ],
    testEnvironment: "jsdom",
    modulePaths: ["<rootDir>"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/js$1",
    },
    moduleFileExtensions: ["jsx", "js", "tsx", "ts", "json"],
    setupFilesAfterEnv: ["<rootDir>/js/jest.setupTests.js"],
    testPathIgnorePatterns: ["./node_modules/"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
    ],
    resetMocks: true,
};
