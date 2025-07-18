import { useState } from 'react';

export default function SubmitShifts() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [formData, setFormData] = useState({
    title: String,
    role: String,
    typeOfShift: String,
    user: String,
    startTime: String,
    finishTime: String,
    numOfShiftsPerDay: Number,
    location: String,
    date: Date,
  });
}