// DashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import ActiveVendorsCard from '../MetricCards/ActiveVendorsCard';
import ContractsExpiringInOneMonthCard from '../MetricCards/ContractsExpiringInOneMonthCard';
import CompletedContractsCard from '../MetricCards/CompletedContractsCard';
import './DashboardOverview.css';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../../src/config/firestore';
import Logout from '../Logout';

const DashboardOverview = () => {
  const [activeVendorsCount, setActiveVendorsCount] = useState(0);
  const [expiringContractsCount, setExpiringContractsCount] = useState(0);
  const [completedContractsCount, setCompletedContractsCount] = useState(0);

  useEffect(() => {
    const getActiveVendorsCount = () => {
      const q = query(collection(db, 'employees'), where('status', '==', 'Active'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setActiveVendorsCount(querySnapshot.size);
      });

      return unsubscribe;
    };

    const getExpiringContractsCount = async () => {
      const currentDate = new Date();
      const thirtyDaysFromNow = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

      const q = query(
        collection(db, 'employees'),
        where('endDate', '>=', currentDate.toISOString()),
        where('endDate', '<=', thirtyDaysFromNow.toISOString())
      );

      const querySnapshot = await getDocs(q);
      setExpiringContractsCount(querySnapshot.size);
    };

    const getCompletedContractsCount = () => {
      const q = query(collection(db, 'employees'), where('status', '==', 'Completed'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setCompletedContractsCount(querySnapshot.size);
      });

      return unsubscribe;
    };

    const unsubscribeActiveVendors = getActiveVendorsCount();
    getExpiringContractsCount();
    const unsubscribeCompletedContracts = getCompletedContractsCount();

    return () => {
      unsubscribeActiveVendors();
      unsubscribeCompletedContracts();
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h2>Dashboard Overview</h2>
        <div className="metrics">
          <ActiveVendorsCard count={activeVendorsCount} />
          <ContractsExpiringInOneMonthCard count={expiringContractsCount} />
          <CompletedContractsCard count={completedContractsCount} />
        </div>
        <div style={{ marginTop: '30px', marginBottom: '18px' }}>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
