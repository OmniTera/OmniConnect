// ContractsExpiringInOneMonthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../src/config/firestore';
import Table from '../VendorList/Table';

const ContractsExpiringInOneMonthPage = () => {
  const [expiringContracts, setExpiringContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpiringContracts = async () => {
      try {
        const today = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(today.getMonth() + 1);

        console.log('Today:', today);
        console.log('One Month Later:', oneMonthLater);

        const q = query(
          collection(db, 'employees'),
          where('endDate', '>=', today.toISOString()),
          where('endDate', '<=', oneMonthLater.toISOString())
        );

        const querySnapshot = await getDocs(q);
        const contracts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Expiring Contracts:', contracts);
        setExpiringContracts(contracts);
      } catch (error) {
        console.error('Error fetching expiring contracts:', error);
      }
    };

    fetchExpiringContracts();
  }, []);

  return (
    <div className="container">
      <h1>Contracts Expiring in One Month</h1>
      {expiringContracts.length > 0 ? (
        <>
          <Table employees={expiringContracts} showOptions={false} />
          <div>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </>
      ) : (
        <p>No contracts expiring in the next month.</p>
      )}
    </div>
  );
};

export default ContractsExpiringInOneMonthPage;
