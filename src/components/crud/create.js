const createShift = async (formData, toggleOverlay, setFormData, data_to_submit) => {
    try {
      const res = await fetch('http://localhost:8000/api/shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken').replace(/^"|"$/g, '')}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        // Shift created successfully
        alert('Shift created!');
        if (typeof toggleOverlay === 'function') toggleOverlay();
        if (typeof setFormData === 'function') setFormData(data_to_submit);
      } else {
        // Handle error response
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      console.log('Error creating shift:', error);
      alert('An unexpected error occurred');
    }
  };
  
  export default createShift;
  