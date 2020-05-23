module.exports = {
  verbose: true,
  transform: {
	"^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.spec.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  rootDir: ".",
  roots: ["<rootDir>/src"],
  collectCoverage: false,
  collectCoverageFrom: [
	"<rootDir>/src/**/*.ts",
	"!<rootDir>/src/entities/*.ts",
	"!<rootDir>/src/exceptions/*.ts",
	"!<rootDir>/src/**/*.d.ts",
  ],
  coverageDirectory: "<rootDir>/coverage",
  testEnvironment: "node",
};
