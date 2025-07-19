// src/components/Shifts/Shifts.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "../../Axios/axios"; // your configured instance
import TokenContext from "../../context/TokenContext";
import Table from "./Table/Table.module.css"; 

export default function Shifts() {
  const { userToken, user } = useContext(TokenContext);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      setLoading(true);
      setError(null);

      if (!userToken || !user?._id) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("/shifts", {
          params: { userId: user._id },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setShifts(data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || err.message || "Failed to load shifts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, [userToken, user]);

  if (loading) return <p>Loading shifts…</p>;
  if (error)
    return <p style={{ color: "red" }}>Error loading shifts: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Shifts</h2>
      {shifts.length === 0 ? (
        <p>No shifts found.</p>
      ) : (
          <div>
          <table style={Table}>
            <tr>
              <th>SHIFT TITLE</th>
              <th>Date</th> 
              <th>Start</th>
              <th>Finish</th>
              <th>Location</th>
              <th>Post Code</th>
              <th>Status</th>
            </tr>
            
            {shifts.map((shift) => (
              
                <tr key={shift._id} style={{ marginBottom: "1rem"}}>
                  <td><strong>{shift.title || "Shift"}</strong> on{" "}</td>
                  <td>{new Date(shift.date).toLocaleDateString()}</td>
                  <td>{shift.startTime}</td>
                  <td>{shift.finishTime}</td>

                  <td>{shift.location?.name}{" "}</td>
                  <td>{shift.location?.postCode ? `(${shift.location.postCode})` : ""}</td>
                  <td></td>
                </tr>
              
            ))}
            
          </table>
          </div>
      )}
    </div>
  );
}
