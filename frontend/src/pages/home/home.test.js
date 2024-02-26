import { render, screen } from '@testing-library/react';
import Home from './home';

test('Render App', () => {
  render(<Home />);
  const searchInput = screen.getByPlaceholderText('Search');
  const linkElement = screen.getByText("Contact");
  expect(linkElement).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
});
