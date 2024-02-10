import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../src/config/firestore';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing, getEmployees }) => {
  const id = selectedEmployee.id;

  const [clientName, setClientName] = useState(selectedEmployee.clientName);
  const [companyName, setCompanyName] = useState(selectedEmployee.companyName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [phoneNumber, setPhoneNumber] = useState(selectedEmployee.phoneNumber);
  const [status, setStatus] = useState(selectedEmployee.status);
  const [startDate, setStartDate] = useState(selectedEmployee.startDate);
  const [endDate, setEndDate] = useState(selectedEmployee.endDate);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!clientName || !companyName || !email || !phoneNumber || !status || !startDate || !endDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedEmployee = {
      id,
      clientName,
      companyName,
      email,
      phoneNumber,
      status,
      startDate,
      endDate,
    };

    await setDoc(doc(db, 'employees', id), {
      ...updatedEmployee,
    });

    setEmployees(employees);
    setIsEditing(false);
    getEmployees();

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${updatedEmployee.clientName} (${updatedEmployee.companyName})'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Update Vendor</h1>
        <label htmlFor="clientName">Client Name</label>
        <input
          id="clientName"
          type="text"
          name="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <label htmlFor="companyName">Company Name</label>
        <input
          id="companyName"
          type="text"
          name="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
