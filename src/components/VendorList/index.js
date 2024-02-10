import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import View from './View';
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../src/config/firestore';

const VendorList = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getStatusAndColor = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (now >= start && now <= end) {
      return { status: 'Active', color: 'green' };
    } else {
      return { status: 'Expired', color: 'red' };
    }
  };

  const getFilteredEmployees = () => {
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.id.includes(searchQuery) ||
        employee.email.includes(searchQuery) ||
        employee.phoneNumber.includes(searchQuery)
    );
    return filteredEmployees;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getEmployees = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      let seqNumber = 1; // Initialize sequential number
      const employeesData = querySnapshot.docs.map((doc) => {
        const employeeData = doc.data();
        const { status, color } = getStatusAndColor(
          employeeData.startDate,
          employeeData.endDate
        );
        return {
          displayId: seqNumber++, // Add a display ID
          id: doc.id,
          ...employeeData,
          status,
          statusColor: color, // Add status color
        };
      });
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setSelectedEmployee(employeeToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, 'employees', id));
          const updatedEmployees = employees.filter((employee) => employee.id !== id);
          setEmployees(updatedEmployees);

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Employee data has been deleted.',
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error('Error deleting employee:', error);
          Swal.fire('Error', 'There was an error deleting the employee.', 'error');
        }
      }
    });
  };

  const handleView = (id) => {
    const employeeToView = employees.find((employee) => employee.id === id);
    setSelectedEmployee(employeeToView);
    setIsViewing(true);
  };

  const handleAdd = async (newEmployee) => {
    try {
      const addedDocRef = await addDoc(collection(db, 'employees'), newEmployee);
      const addedEmployee = { id: addedDocRef.id, ...newEmployee };

      setEmployees([...employees, addedEmployee]);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${newEmployee.clientName} ${newEmployee.companyName}'s data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      Swal.fire('Error', 'There was an error adding the employee.', 'error');
    }
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && !isViewing ? (
        <>
          <Header setIsAdding={setIsAdding} setIsAuthenticated={setIsAuthenticated} setSearchQuery={setSearchQuery} />
          <Table
            employees={getFilteredEmployees().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
            showOptions={true}
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={getFilteredEmployees().length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <>
          {isAdding && (
            <Add setIsAdding={setIsAdding} getEmployees={getEmployees} />
          )}
          {isEditing && selectedEmployee && (
            <Edit
              selectedEmployee={selectedEmployee}
              setIsEditing={setIsEditing}
              getEmployees={getEmployees}
            />
          )}
          {isViewing && selectedEmployee && (
            <View selectedEmployee={selectedEmployee} setIsViewing={setIsViewing} />
          )}
        </>
      )}
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VendorList;
