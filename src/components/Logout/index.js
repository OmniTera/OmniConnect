// Logout.jsx
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Login/AuthContext'; // Update the path as per your file structure

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: async () => {
            await logout();
            navigate('/');
          },
        });
      }
    });
  };

  return (
    <button style={{ marginLeft: '12px' }} className="muted-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
