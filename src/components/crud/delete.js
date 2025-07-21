async function deleteShift(id) {
    try {
      const response = await fetch(`http://localhost:8000/api/shifts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken").replace(/^"|"$/g, '')}`,
        },
      });
  
      if (!response.ok) {
        // Handle error response
        const errorText = await response.text();
        console.error("Delete failed:", errorText);
        return false;
      }
      // Shift deleted successfully
      const data = await response.json();
      console.log("Shift deleted:", data);
      return true;
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error("Error deleting shift:", error);
      return false;
    }
  }

export default deleteShift;