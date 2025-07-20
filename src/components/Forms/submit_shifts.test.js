/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubmitShifts from './submit_shifts';
import '@testing-library/jest-dom';

import editForm from '../crud/edit';


jest.mock('../crud/create', () => jest.fn(() => Promise.resolve()));
jest.mock('../crud/edit', () => jest.fn(() => Promise.resolve()));

describe('SubmitShifts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders shift form', () => {
    render(<SubmitShifts method="create" />);
    expect(screen.getByTestId('shift-form')).toBeInTheDocument();
  });

  it('renders form and submits with create method', async () => {
    render(<SubmitShifts method="create" onClose={jest.fn()} initialData={{}} />);
    
    const titleInput = screen.getByPlaceholderText('Title');
    const locationInput = screen.getByPlaceholderText('LOCATION NAME');
    const form = screen.getByTestId('shift-form');

    fireEvent.change(titleInput, { target: { value: 'TESTING SHIFFT' } });
    fireEvent.change(locationInput, { target: { value: 'TESTING THE LOCATION' } });
    
    fireEvent.submit(form);
    
    expect(createForm).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Manager', location: { name: 'Another location test.....' } }),
      expect.any(Function),

    );
  });

  it('calls editForm when method is edit', () => {
    render(<SubmitShifts method="edit" onClose={jest.fn()} initialData={{ title: 'fromlondon', location: { name: 'sendLocationnn' } }} />);
    
    const form = screen.getByTestId('shift-form');
    fireEvent.submit(form);

    expect(editForm).toHaveBeenCalled();
  });
});
