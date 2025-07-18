import { useState } from 'react';

const data_to_submit = {
    title: "String",
    role: "String",
    typeOfShift: "String",
    user: "String",
    startTime: "String",
    finishTime: "String",
    numOfShiftsPerDay: "Number",
    location: "String",
    date: "Date"
}
export default function SubmitShifts() {
const [setShowOverlay] = useState(false);
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
      const res = await fetch('http://localhost:8000/api/shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // sending JSON
          'Authorization': `Bearer ${localStorage.getItem('authToken').replace(/^"|"$/g, '')}`, // forgot to send the tokens (finally fixed my issue)
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Shift created!');
        toggleOverlay();
        setFormData(data_to_submit);
      } else {
        alert('Failed to create shift');
      }
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
            <h2 style={{color: 'white'}}>Create Shift</h2>
            {Object.entries(formData).map(([key, type]) => (
                
            <div style={FormStyle}>
                <script>console.log({type})</script>
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
            ))}
            

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
