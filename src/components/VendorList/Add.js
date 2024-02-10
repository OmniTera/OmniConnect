import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../src/config/firestore';

const Add = ({ employees, setEmployees, setIsAdding, getEmployees }) => {
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!clientName || !companyName || !email || !status || !startDate || !endDate || !phoneNumber) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      clientName,
      companyName,
      email,
      status,
      startDate,
      endDate,
      phoneNumber,
    };

    employees.push(newEmployee);

    try {
      await addDoc(collection(db, 'employees'), {
        ...newEmployee,
      });
    } catch (error) {
      console.log(error);
    }

    setEmployees(employees);
    setIsAdding(false);
    getEmployees();

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${clientName} ${companyName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="clientName">Client Name</label>
        <input
          id="clientName"
          type="text"
          name="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <label htmlFor="companyName">Organization</label>
        <input
          id="companyName"
          type="text"
          name="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <div style={{ width: '250px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <PhoneInput
            id="phoneNumber"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            style={{ border: 'none', width: '100%', padding: '8px', outline: 'none' }}
          />
        </div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="status">Status</label>
        
        <label htmlFor="startDate">Contract Start</label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">Contract End</label>
        <input
          id="endDate"
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
