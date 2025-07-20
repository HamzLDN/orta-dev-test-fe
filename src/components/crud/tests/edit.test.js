/**
 * @jest-environment jsdom
 */

import edit from '../edit.js';

describe('edit', () => {
  const formData = { _id: '123', title: 'Test Shift' };
  const dataToSubmit = { title: '' };
  let alertMock;

  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => '"fake-token"');
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    global.fetch = jest.fn();
  });

  afterEach(() => {
    alertMock.mockRestore();
  });

  it('calls fetch with PUT and handles success', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    const toggleOverlay = jest.fn();
    const setFormData = jest.fn();

    await edit(formData, toggleOverlay, setFormData, dataToSubmit);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:8000/api/shifts/${formData._id}`,
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: expect.stringContaining('fake-token'),
        }),
        body: JSON.stringify(formData),
      })
    );

    expect(alertMock).toHaveBeenCalledWith('Shift updated!');
    expect(toggleOverlay).toHaveBeenCalled();
    expect(setFormData).toHaveBeenCalledWith(dataToSubmit);
  });

  it('handles fetch failure with message', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Update failed' }),
    });

    await edit(formData, null, null, dataToSubmit);

    expect(alertMock).toHaveBeenCalledWith('Update failed');
  });

  it('handles network errors gracefully', async () => {
    const error = new Error('Network failure');
    fetch.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await edit(formData, null, null, dataToSubmit);

    expect(consoleSpy).toHaveBeenCalledWith('Error updating shift:', error);
    expect(alertMock).toHaveBeenCalledWith('An unexpected error occurred');

    consoleSpy.mockRestore();
  });
});
