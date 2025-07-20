/**
 * @jest-environment jsdom
 */

import createShift from '../create.js';

describe('createShift', () => {
  const formData = { title: 'Test Shift' };
  const dataToSubmit = { title: '' };

  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => '"fake-token"');

    window.alert = jest.fn();
  });

  it('calls fetch with correct params and handles success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    const toggleOverlay = jest.fn();
    const setFormData = jest.fn();

    await createShift(formData, toggleOverlay, setFormData, dataToSubmit);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/shifts', expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
        'Authorization': expect.stringContaining('fake-token'),
      }),
      body: JSON.stringify(formData),
    }));

    expect(window.alert).toHaveBeenCalledWith('Shift created!');
    expect(toggleOverlay).toHaveBeenCalled();
    expect(setFormData).toHaveBeenCalledWith(dataToSubmit);
  });

  it('handles fetch response with error message', async () => {
    const errorMessage = 'Shift creation failed';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      })
    );

    window.alert = jest.fn();

    await createShift(formData, null, null, dataToSubmit);

    expect(window.alert).toHaveBeenCalledWith(errorMessage);
  });

  it('handles network or unexpected errors', async () => {
    const error = new Error('Network failure');
    global.fetch = jest.fn(() => Promise.reject(error));

    window.alert = jest.fn();
    console.log = jest.fn();

    await createShift(formData, null, null, dataToSubmit);

    expect(console.log).toHaveBeenCalledWith('Error creating shift:', error);
    expect(window.alert).toHaveBeenCalledWith('An unexpected error occurred');
  });
});
