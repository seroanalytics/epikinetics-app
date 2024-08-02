/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{
      diagnostics: false,
    }],
  },
  moduleNameMapper: {
    '^d3-scale-chromatic': '<rootDir>/node_modules/d3-scale-chromatic/dist/d3-scale-chromatic.js',
    '^d3-interpolate': '<rootDir>/node_modules/d3-interpolate/dist/d3-interpolate.js',
    '^d3-color': '<rootDir>/node_modules/d3-color/dist/d3-color.js',
  },
}
