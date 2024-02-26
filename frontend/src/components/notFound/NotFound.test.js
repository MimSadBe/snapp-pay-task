import {render, screen} from "@testing-library/react";
import NotFound from "./NotFound";

test('Render NotFound', () => {
  render(<NotFound />);
  const linkElement = screen.getByText("The stuff you were looking for doesn't exist");
  expect(linkElement).toBeInTheDocument();
});
