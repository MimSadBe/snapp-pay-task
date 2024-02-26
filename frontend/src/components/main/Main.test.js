import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainComponent from './Main';
import {ContactAppContext} from "../../context/main";

jest.mock('../../context/main');

describe('MainComponent', () => {

  test('Renders the main content with profile and contact list', () => {
    const mockContactList = [
      { id: 1, first_name: 'John', last_name: 'Doe' },
      { id: 2, first_name: 'Jane', last_name: 'Smith' },
    ];

    render(
        <MemoryRouter initialEntries={['/']}>
          <ContactAppContext.Provider value={{ contactList: mockContactList, isFocus: false, isLoading: false }}>
            <MainComponent />
          </ContactAppContext.Provider>
        </MemoryRouter>
    );

    const profileName = screen.getByText('Sadegh Babaei');
    const firstContactLink = screen.queryByText('John');
    const secondContactLink = screen.queryByText('Smith');
    expect(profileName).toBeInTheDocument();
    expect(firstContactLink).toBeInTheDocument();
    expect(secondContactLink).toBeInTheDocument();
  });

  test('Renders "No Result" when contact list is empty', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <ContactAppContext.Provider value={{ contactList: [], isFocus: false, isLoading: false }}>
            <MainComponent />
          </ContactAppContext.Provider>
        </MemoryRouter>
    );

    const noResultText = screen.getByText('No Result');
    expect(noResultText).toBeInTheDocument();
  });

  test('Renders loading indicator while data is loading', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <ContactAppContext.Provider value={{ contactList: null, isFocus: false, isLoading: true }}>
            <MainComponent />
          </ContactAppContext.Provider>
        </MemoryRouter>
    );

    const loadingImage = screen.getByAltText('loading');
    expect(loadingImage).toBeInTheDocument();
  });
});
