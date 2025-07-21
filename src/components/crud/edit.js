const edit = async (formData, toggleOverlay, setFormData, data_to_submit) => {
    try {
        const res = await fetch(`http://localhost:8000/api/shifts/${formData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken').replace(/^"|"$/g, '')}`,
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            // Shift updated successfully
            alert('Shift updated!');
            if (typeof toggleOverlay === 'function') toggleOverlay();
            if (typeof setFormData === 'function') setFormData(data_to_submit);
        } else {
            const data = await res.json();
            alert(data.message);
        }
    } catch (error) {
        // handle network errors or unexpected issues
        console.error('Error updating shift:', error);
        alert('An unexpected error occurred');
    }
}
export default edit;