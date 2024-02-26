import {render,screen} from '@testing-library/react';
import HeaderComponent from './Header';
describe('HeaderComponent', () => {
  test('renders the header with placeholders', () => {
    render(<HeaderComponent />);

    const firstNameInput = screen.getByPlaceholderText('Search');
    const lastNameInput = screen.getByPlaceholderText('Last Name');

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
  });
});