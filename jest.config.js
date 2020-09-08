module.exports = {
  roots: [
    "./",
  ],
  testMatch: [
    "**/tests/**/*.test.(ts|js)",
  ],
  moduleDirectories: [
    "./",
    "node_modules",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testTimeout: 300000,
  setupFiles: [
    "dotenv/config"
  ]
};
