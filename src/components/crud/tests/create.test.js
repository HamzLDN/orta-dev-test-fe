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
