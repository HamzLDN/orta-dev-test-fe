import React, { useEffect, useState, useContext } from "react";
import createForm from '../crud/create';
import editForm from '../crud/edit'

const defaultForm = {
    location: {
        name: '',
        postCode: '',
        constituency: '',
        adminDistrict: '',
        distance: '',
        cordinates: {
            longitude: '',
            latitude: '',
            useRotaCloud: false,
        }
    },
    title: '',
    role: '',
    typeOfShift: '',
    startTime: '',
    finishTime: '',
    numOfShiftsPerDay: '',
    date: '',
  }
export default function SubmitShifts({method, onClose, initialData}) {
  const [_, setShowOverlay] = useState(null);

  const [formData, setFormData] = useState(() => {
    if (method === 'edit' && initialData) {
      return { ...defaultForm, ...initialData };
    }
    return defaultForm;
  });
    
  const toggleOverlay = () => {
    setShowOverlay(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");
    const finalValue = type === "checkbox" ? checked : value;
  
    setFormData(prev => {
      const updated = { ...prev };
      let current = updated;
  
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
  
      current[keys[keys.length - 1]] = finalValue;
      return updated;
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (method === 'create') {
            let confirmation = window.confirm("Are you sure you want to create this shift?");
            if (confirmation) {
                await createForm(formData, toggleOverlay, setFormData, formData);
                // window.location.reload(false);
            }
            
        } else if (method === 'edit') {
            let confirmation = window.confirm("Are you sure you want to edit this shift?");
            if (confirmation) {

                await editForm(formData, toggleOverlay, setFormData, formData);
                // window.location.reload(false);
            }
        }
    } catch (err) {
      console.error('POST error:', err);
    }
  };
  useEffect(() => {
    setFormData({ ...defaultForm, ...initialData });
  }, [method, initialData]);
  console.log(formData.title)
  return (
    <div>
      <button onClick={toggleOverlay} className="btn btn-primary">
      </button>

      {(
        <div className="overlay" onClick={toggleOverlay}>
          <form data-testid="shift-form"
            onClick={e => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="shift-form"
          >
            <h1>{method} Shift</h1>
            <br/>
            <h1>JOB TYPE</h1>

            <div key='title'>
                <label>
                    <h2 style={{color: 'white'}}>Title</h2>
                        <input
                        type='text'
                        name='title'
                        value={formData.title ? formData.title : ""}
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
                        value={formData.role ? formData.role : ""}
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
                        value={formData.typeOfShift ? formData.typeOfShift : ""}
                        onChange={handleChange}
                        required
                        />
                        
                    </label>
                <br />
            </div>
            <h1>SHIFT HOURS</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%'}}>

                <div key='StartTime'>
                    <label>
                        <p>From</p>
                            <input
                            type='time'
                            name='startTime'
                            value={formData.startTime ? formData.startTime : ""}
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
                        value={formData.finishTime ? formData.finishTime : ""}
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
                        value={formData.numOfShiftsPerDay ? formData.numOfShiftsPerDay : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='date'>
                <label>
                    <h2 style={{color: 'white'}}>Schedule a date{formData.date ? formData.date.slice(0, 10) : ''}</h2>
                        <input
                        type='date'
                        name='date'
                        value={formData.date ? formData.date.slice(0, 10) : ''}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <h1>GENERAL LOCATION INFORMATION</h1>
            <div key='location'>
                <label>
                    <h2 style={{color: 'white'}}>Location</h2>
                        <input
                        type='text'
                        name='location.name'
                        value={formData.location.name ? formData.location.name : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='postCode'>
                <label>
                    <h2 style={{color: 'white'}}>Post Code</h2>
                        <input
                        type='text'
                        name='location.postCode'
                        value={formData.location.postCode ? formData.location.postCode : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='constituency'>
                <label>
                    <h2 style={{color: 'white'}}>Constituency</h2>
                        <input
                        type='text'
                        name='location.constituency'
                        value={formData.location.constituency ? formData.location.constituency : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='adminDistrict'>
                <label>
                    <h2 style={{color: 'white'}}>Admin District</h2>
                        <input
                        type='text'
                        name='location.adminDistrict'
                        value={formData.location.adminDistrict ? formData.location.adminDistrict : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='longitude'>
                <label>
                    <h2 style={{color: 'white'}}>Longitude</h2>
                        <input
                        type='number'
                        name='location.cordinates.longitude'
                        value={formData.location.cordinates.longitude ? formData.location.cordinates.longitude : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='latitude'>
                <label>
                    <h2 style={{color: 'white'}}>Latitude</h2>
                        <input
                        type='number'
                        name='location.cordinates.latitude'
                        value={formData.location.cordinates.latitude ? formData.location.cordinates.latitude : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='distance'>
                <label>
                    <h2 style={{color: 'white'}}>Distance</h2>
                        <input
                        type='number'
                        name='location.distance'
                        value={formData.location.distance ? formData.location.distance : ""}
                        onChange={handleChange}
                        required
                        />
                    </label>
                <br />
            </div>
            <div key='useRotaCloud'>
                <label>
                    <center><h2 style={{color: 'white'}}>Use RotaCloud</h2></center>
                        <input
                        type='checkbox'
                        name='location.cordinates.useRotaCloud'
                        checked={formData.location.cordinates.useRotaCloud}
                        onChange={(e) => handleChange({ target: { name: 'location.cordinates.useRotaCloud', value: e.target.checked } })}
                        />
                    </label>
                <br />
            </div>

            <center><button style={{backgroundColor: 'white', padding: '10px', color: 'black'}} type="submit">Submit</button></center>
          </form>
        </div>
      )}
    </div>
  );
}
