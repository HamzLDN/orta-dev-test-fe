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
        const errorText = await response.text();
        console.error("Delete failed:", errorText);
        return false;
      }
  
      const data = await response.json();
      console.log("Shift deleted:", data);
      return true;
    } catch (error) {
      console.error("Error deleting shift:", error);
      return false;
    }
  }

export default deleteShift;