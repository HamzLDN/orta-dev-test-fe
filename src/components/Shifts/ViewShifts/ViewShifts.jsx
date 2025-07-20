import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './shiftStyles.css';
import deleteShift from '../../crud/delete.js';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB')
}

function ViewShift() {
  const query = useQuery();
  const id = query.get('id');
  const userId = query.get('userId');

  const [shift, setShift] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken')?.replace(/^"|"$/g, '');
    if (!token || !id || !userId) return;

    const url = `http://localhost:8000/api/shifts/?userId=${encodeURIComponent(userId)}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) return res.text().then(text => { throw new Error(text); });
        return res.json();
      })
      .then(shifts => {
        const found = shifts.find(s => s._id === id);
        setShift(found);
      })
      .catch(err => setError(err.message));
  }, [id, userId]);

  if (error) return <div>Error: {error}</div>;
  if (!shift) return <div>Loading shift...</div>;

  return (
    <div>
        <br/>
      <nav>
        <Link to={`/`} className='buttonStyle'>MAIN PAGE</Link>
      </nav>
      <br/>

      {/* General info */}
      <section className='sectionStyle'>
        <h2 className='titleStyle'>General</h2>
        <p><strong>Title:</strong> {shift.title}</p>
        <p><strong>Role:</strong> {shift.role}</p>
        <p><strong>Type of Shift:</strong> {Array.isArray(shift.typeOfShift) ? shift.typeOfShift.join(', ') : shift.typeOfShift}</p>
      </section>

      {/* Schedules */}
      <section className='sectionStyle'>
        <h2 className='titleStyle'>Time</h2>
        <p><strong>Date:</strong> {formatDate(shift.date)}</p>
        <p><strong>Start:</strong> {shift.startTime}</p>
        <p><strong>Finish:</strong> {shift.finishTime}</p>
        <button>CLOCK IN</button>
        &nbsp;
        <button>CLOCK OUT</button>
      </section>

      {/* location */}
      <section className='sectionStyle'>
        <h2 className='titleStyle'>Location</h2>
        <p><strong>Name:</strong> {shift.location?.name}</p>
        <p><strong>Post Code:</strong> {shift.location?.postCode}</p>
        <p><strong>Constituency:</strong> {shift.location?.constituency}</p>
        <p><strong>Admin District:</strong> {shift.location?.adminDistrict}</p>
      </section>

      <section className='sectionStyle'>
        <h2 className='titleStyle'>Delete</h2>
        <button
            onClick={async () => {
                const success = await deleteShift(id);
                if (success) {
                window.location.href = "/";
                } else {
                alert("Failed to delete shift.");
                }
            }}
            >
            DELETE SHIFT
            </button>
      </section>
    </div>
  );
}

export default ViewShift;
