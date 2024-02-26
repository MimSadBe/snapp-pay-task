import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import ContactId from './ContactId';


describe('ContactId', () => {

  test('renders the contact details with header and navigation', async () => {

    render(
        <MemoryRouter initialEntries={['/contact/123']}>
          <ContactId/>
        </MemoryRouter>
    );

    await Promise.resolve();

    const contactName = screen.getByText('John Doe');
    expect(contactName).toBeInTheDocument();
    const company = screen.getByText('Acme Inc.');
    expect(company).toBeInTheDocument();

    const backLink = screen.getByText('Contacts');
    expect(backLink).toBeInTheDocument();

    const editSpan = screen.getByText('Edit');
    expect(editSpan).toBeInTheDocument();
  });
});
