async function deleteShift(id) {
    // It sends a DELETE request to the API endpoint with the shift ID
    fetch(`http://localhost:8000/api/shifts/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken").replace(/^"|"$/g, '')}`,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Shift deleted:", data);
    return true
    })
    .catch((error) => {
    console.error("Error deleting shift:", error);
    });
}

export default deleteShift;