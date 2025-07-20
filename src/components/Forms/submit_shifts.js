import React, { useEffect, useState, useContext } from "react";
import createForm from '../crud/create';
import editForm from '../crud/edit'
const defaultForm = {
    location: {
        name: '',
        postCode: '',
        constituency: '',
        adminDistrict: '',
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
    const { name, value } = e.target;
  
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
  
      setFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (method === 'create') {
            await createForm(formData, toggleOverlay, setFormData, formData);
            // window.location.reload(false);
        } else if (method === 'edit') {
            await editForm(formData, toggleOverlay, setFormData, formData);
            window.location.reload(false);
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
            <button style={{backgroundColor: 'white', padding: '10px'}} type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
