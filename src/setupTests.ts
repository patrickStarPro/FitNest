// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Configure testing library to reduce HTML output on failures
import { configure } from '@testing-library/react';

configure({
  getElementError: (message: string | null) => {
    const error = new Error(message || undefined);
    error.name = 'TestingLibraryElementError';
    // Remove stack trace to reduce verbosity
    Error.captureStackTrace(error, configure);
    return error;
  },
});
