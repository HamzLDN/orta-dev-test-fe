// src/components/Shifts/Shifts.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "../../Axios/axios"; // your configured instance
import TokenContext from "../../context/TokenContext";
import Table from "./Table/Table.module.css"; 
import deleteShift from "../crud/delete"
import SubmitShifts from '../../components/Forms/submit_shifts.js';
import './overlay.css';

function getShiftStatus(startTime, finishTime, date) {
  const now = new Date();

  // converts date to utc
  const baseDate = new Date(date);

  // UTC exact year, month, and day
  const year = baseDate.getUTCFullYear();
  const month = baseDate.getUTCMonth();
  const day = baseDate.getUTCDate();

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = finishTime.split(":").map(Number);

  const start = new Date(year, month, day, startHour, startMinute);
  const end = new Date(year, month, day, endHour, endMinute);

  if (now < start) return {'status': 'Pending', 'colour': 'blue'}
  if (now >= start && now <= end) return {'status': 'In Progress', 'colour': 'lightgreen'}
  return {'status': 'Complete', 'colour': 'black'}
}



export default function Shifts() {
  const [editShiftId, setEditShiftId] = useState(null);
  const openOverlay = (id) => setEditShiftId(id);
  const closeOverlay = () => setEditShiftId(null);

  function modifyshifts(id, method) {
    // on click if user clicks on delete send to endpoint /api/shifts:id
    if (method==="delete") {
      if (deleteShift(id)) setShifts(prevShifts => prevShifts.filter(shift => shift._id !== id));
      console.log("Shift deleted", id);
    }
  }

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
              <th>Actions</th>
            </tr>
            
            {shifts.map((shift) => (
                
                <tr key={shift._id} style={{ marginBottom: "1rem"}}>
                  <td><strong>{shift.title || "Shift"}</strong> on{" "}</td>
                  <td>{new Date(shift.date).toLocaleDateString()}</td>
                  <td>{shift.startTime}</td>
                  <td>{shift.finishTime}</td>

                  <td>{shift.location?.name}{" "}</td>
                  <td>{shift.location?.postCode ? `(${shift.location.postCode})` : ""}</td>
                  <td>{getShiftStatus(shift.startTime, shift.finishTime, shift.date).status}
                    <div style={{padding: "5px", backgroundColor: getShiftStatus(shift.startTime, shift.finishTime, shift.date).colour, width: '10px', height: '10px', float: 'right'}}></div>
                  </td>
                  {/* STATUS WLL BE EITHER pending inprogress complete */}
                  <td>
                    
                    {/* <button
                      onClick={() => {
                        {showOverlay && (
                          <div onClick={toggleOverlay}>
                             <SubmitShifts method="edit" />
                          </div>
                      )}
                        {modifyshifts(shift._id, "edit")}
                        console.log("Shifts edited", shift._id);
                      }}
                      style={{ marginRight: "0.5rem", backgroundColor: "#4CAF50", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px" }}
                    > */}
                    <button 
                      onClick={() => openOverlay(shift._id)} 
                      style={{ 
                        marginRight: "0.5rem", 
                        backgroundColor: "#4CAF50", 
                        color: "white", 
                        border: "none", 
                        padding: "0.5rem 1rem", 
                        borderRadius: "4px" 
                      }}
                    >
                      Edit
                    </button>
                                            
                    {editShiftId === shift._id && (
                      <div className="overlay" onClick={closeOverlay}>
                        <div onClick={e => e.stopPropagation()}>
                          <SubmitShifts  method="edit"  onClose={closeOverlay} initialData={shift} 
                          />
                        </div>
                      </div>
                    )}



                    <button
                      onClick={() => {
                        // Handle delete shift
                        {modifyshifts(shift._id, "delete")}
                        console.log("Delete shift:", shift._id);
                      }}
                      style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px" }}
                    >
                      Delete
                    </button>
                    
                    
                  </td>
                </tr>
              
            ))}
            
          </table>
          </div>
      )}
    </div>
  );
}
