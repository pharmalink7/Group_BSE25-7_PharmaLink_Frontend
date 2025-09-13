// src/App.test.jsx

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the home page with the correct welcome heading", () => {
  render(<App />);

  
  const headingElement = screen.getByRole('heading', {
    name: /Welcome to PharmaLink/i,
  });

  expect(headingElement).toBeInTheDocument();
});