import React from 'react';

const Table = ({ employees, handleEdit, handleDelete, handleView, showOptions }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Client Name</th>
            <th>Organization</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            {showOptions && <th colSpan={3} className="text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.displayId}</td>
              <td>{employee.clientName}</td>
              <td>{employee.companyName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>
                <span style={{ color: employee.statusColor, marginRight: '5px' }}>●</span>
                {employee.status}
              </td>
              <td>{employee.startDate}</td>
              <td>{employee.endDate}</td>
              {showOptions && (
                <>
                  <td className="text-right">
                    <button onClick={() => handleEdit(employee.id)} className="button muted-button">Update</button>
                  </td>
                  <td className="text-left">
                    <button onClick={() => handleDelete(employee.id)} className="button muted-button">Delete</button>
                  </td>
                  <td className="text-center">
                    <button onClick={() => handleView(employee.id)} className="button muted-button">View</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
