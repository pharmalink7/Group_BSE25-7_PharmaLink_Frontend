import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Banange the code will be here/i);
  expect(headingElement).toBeInTheDocument();
});
