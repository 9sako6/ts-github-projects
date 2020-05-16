module.exports = {
  roots: [
    "./",
  ],
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  moduleDirectories: [
    "./",
    "node_modules",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testTimeout: 10000,
  setupFiles: [
    "dotenv/config"
  ]
};
