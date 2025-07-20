import React, { useEffect, useState, useContext } from "react";
import TokenContext from "../../context/TokenContext";
import createForm from '../crud/create';
import editForm from '../crud/edit'
import axios from "../../Axios/axios";

export default function SubmitShifts({method}) {
  const { userToken, user } = useContext(TokenContext);
  const [_, setShowOverlay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({
    location: '',
    title: '',
    role: '',
    typeOfShift: '',
    startTime: '',
    finishTime: '',
    numOfShiftsPerDay: '',
    date: '',
  });
    
  const toggleOverlay = () => {
    setShowOverlay(prev => !prev);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (method === 'create') {
            await createForm(formData, toggleOverlay, setFormData, formData);
            window.location.reload(false);
        } else if (method === 'edit') {
            await editForm(formData, toggleOverlay, setFormData, formData);
            window.location.reload(false);
        }
    } catch (err) {
      console.error('POST error:', err);
    }
  };
  useEffect(() => {
    const fetchShifts = async () => {
      setLoading(true);
      setError(null);

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
  
  return (
    <div>
      <button onClick={toggleOverlay} className="btn btn-primary">
      </button>

      {(
        <div className="overlay" onClick={toggleOverlay}>
          <form
            onClick={e => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="shift-form"
          >
            <br/>
            <h2 style={{color: 'white'}}>{method} Shift</h2>
            <br/>
            <br/>
            <div key='Title'>
                <label>
                    <h2 style={{color: 'white'}}>Title</h2>
                        <input
                        type='text'
                        name='title'
                        value={method === "edit" ? formData.title : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='role'>
                <label>
                    <h2 style={{color: 'white'}}>Role</h2>
                        <input
                        type='text'
                        name='role'
                        value={method === "edit" ? formData.role : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='TypeOfShift'>
                <label>
                    <h2 style={{color: 'white'}}>Type of shift</h2>
                        <input
                        type='text'
                        name='typeOfShift'
                        value={method === "edit" ? formData.typeOfShift : ""}
                        onChange={handleChange}
                        required
                        />
                        
                    </label>
                <br />
            </div>
            <h1>Shift hours</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%'}}>

                <div key='StartTime'>
                    <label>
                        <p>From</p>
                            <input
                            type='time'
                            name='startTime'
                            value={method === "edit" ? formData.startTime : ""}
                            onChange={handleChange}
                            required
                            />

                        </label>
                </div>
                <div key='FinishTime'>
                    <label>
                        <p>To</p>
                        <input 
                        type="time"
                        name="finishTime"
                        value={method === "edit" ? formData.finishTime : ""}
                        onChange={handleChange}
                        required>

                        </input>

                        </label>
                    <br />
                </div>
            </div>
            <div key='numOfShiftsPerDay'>
                <label>
                    <h2 style={{color: 'white'}}>Number of shift per day</h2>
                        <input
                        type='number'
                        name='numOfShiftsPerDay'
                        value={method === "edit" ? formData.numOfShiftsPerDay : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='date'>
                <label>
                    <h2 style={{color: 'white'}}>Schedule a date</h2>
                        <input
                        type='date'
                        name='date'
                        value={method === "edit" ? formData.date : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            
            <div>
            <h2 style={{color: 'white'}}>Location</h2>
            <select name="location" id="location" value={formData.location} onChange={handleChange} required>
                <option value="">Locations</option>
                <option value="The Willow">The Willow</option>
                <option value="Manchester Piccadilly Station">Manchester Piccadilly Station</option>
                <option value="MediaCityUK">MediaCityUK</option>
                <option value="Clippers House, Clippers Quay">Clippers House, Clippers Quay</option>
                <option value="Old Trafford Stadium">Old Trafford Stadium</option>
            </select>
            </div>
            <button style={{backgroundColor: 'white', padding: '10px'}} type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
