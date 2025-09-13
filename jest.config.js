export default {
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp|avif)$": "<rootDir>/test/__mocks__/fileMock.js"
  },
  // setupFilesAfterEnv: ["@testing-library/jest-dom"]
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
};
