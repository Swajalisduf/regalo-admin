module.exports = {
    // roots: ["<rootDir>/js"],
    rootDir: "./resources",
    collectCoverageFrom: [
        "js/**/*.{js,jsx,ts,tsx}",
        "!js/**/*.d.ts",
        "!js/mocks/**",
    ],
    coveragePathIgnorePatterns: [],
    setupFilesAfterEnv: ["<rootDir>/js/config/jest/setupTests.js"],
    testEnvironment: "jsdom",
    modulePaths: ["<rootDir>/js"],
    transform: {
        "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
        "^.+\\.css$": "<rootDir>/js/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
            "<rootDir>/js/config/jest/fileTransform.js",
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    modulePaths: ["<rootDir>/js"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    },
    moduleFileExtensions: [
        // Place tsx and ts to beginning as suggestion from Jest team
        // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
        "tsx",
        "ts",
        "web.js",
        "js",
        "web.ts",
        "web.tsx",
        "json",
        "web.jsx",
        "jsx",
        "node",
    ],
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
    ],
    resetMocks: true,
};
