/**
 * @jest-environment jsdom
 */

import deleteShift from '../delete.js';

describe('deleteShift', () => {
  const shiftId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => '"fake-token"');
    console.error = jest.fn();
    console.log = jest.fn();
  });

  it('calls fetch with correct parameters and returns true on success', async () => {
    const mockResponseData = { message: 'Deleted successfully' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      })
    );

    const result = await deleteShift(shiftId);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:8000/api/shifts/${shiftId}`,
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: expect.stringContaining('fake-token'),
        }),
      })
    );

    expect(console.log).toHaveBeenCalledWith('Shift deleted:', mockResponseData);
    expect(result).toBe(true);
  });

  it('returns false and logs error when response is not ok', async () => {
    const errorText = 'Not found';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve(errorText),
      })
    );

    const result = await deleteShift(shiftId);

    expect(console.error).toHaveBeenCalledWith('Delete failed:', errorText);
    expect(result).toBe(false);
  });

  it('returns false and logs error on network failure', async () => {
    const error = new Error('Network failure');
    global.fetch = jest.fn(() => Promise.reject(error));

    const result = await deleteShift(shiftId);

    expect(console.error).toHaveBeenCalledWith('Error deleting shift:', error);
    expect(result).toBe(false);
  });
});
