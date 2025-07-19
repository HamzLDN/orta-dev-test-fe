import { useState } from 'react';
import createForm from '../crud/create';
const data_to_submit = {
    title: "text",
    role: "text",
    typeOfShift: "text",
    startTime: "text",
    finishTime: "text",
    numOfShiftsPerDay: "number",
    date: "date",
    location: "",
};

export default function SubmitShifts() {
const [showOverlay, setShowOverlay] = useState(false);

  const [formData, setFormData] = useState(data_to_submit);
    
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
        createForm(formData, toggleOverlay, setFormData, data_to_submit);
    } catch (err) {
      console.error('POST error:', err);
    }
  };

  const FormStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

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
            <h2 style={{color: 'white'}}>Create Shift</h2>
            <br/>

            <div style={FormStyle}>
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
            
            {Object.entries(formData).map(([key, type]) => {
                if (key === "location") return null;

                return (
                    <div style={FormStyle} key={key}>
                    <label>
                        <h2 style={{color: 'white'}}>{key}</h2>
                        <input
                        type={type}
                        name={key}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <br />
                    </div>
                );
                })}


            

            <button style={{backgroundColor: 'white', padding: '10px'}} type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
