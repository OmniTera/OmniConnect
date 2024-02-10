// CompletedContractsPage.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../src/config/firestore';
import Table from '../VendorList/Table';
import { useNavigate } from 'react-router-dom';

const CompletedContractsPage = () => {
  const [completedContracts, setCompletedContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletedContracts = async () => {
      try {
        const q = query(collection(db, 'employees'), where('status', '==', 'Completed'));
        const querySnapshot = await getDocs(q);
        const contracts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Completed Contracts:', contracts);
        setCompletedContracts(contracts);
      } catch (error) {
        console.error("Error fetching completed contracts:", error);
      }
    };

    fetchCompletedContracts();
  }, []);

  return (
    <div className="container">
      <h1>Completed Contracts</h1>
      <Table employees={completedContracts} showOptions={false} />
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default CompletedContractsPage;
