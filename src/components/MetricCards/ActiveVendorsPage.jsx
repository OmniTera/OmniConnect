// ActiveVendorsPage.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../src/config/firestore';
import Table from '../VendorList/Table';
import { useNavigate } from 'react-router-dom';

const ActiveVendorsPage = () => {
  const [activeVendors, setActiveVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveVendors = async () => {
      const q = query(collection(db, 'employees'), where('status', '==', 'Active'));
      const querySnapshot = await getDocs(q);
      const vendors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActiveVendors(vendors);
    };

    fetchActiveVendors();
  }, []);

  return (
    <div className="container">
      <h1>Active Contracts</h1>
      <Table employees={activeVendors} showOptions={false} />
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default ActiveVendorsPage;
