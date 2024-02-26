import {render, screen} from "@testing-library/react";
import App from "./App";

test('Render App', async () => {
  render(<App />)
  expect(screen.getByText("Contact")).toBeInTheDocument()
})
