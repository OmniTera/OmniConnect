import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import VendorList from './components/VendorList';
import PhoneVerification from './components/PhoneVerification/PhoneVerification';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import NavigationBar from './components/Navbar/NavigationBar';
import ActiveVendorsPage from './components/MetricCards/ActiveVendorsPage';
import CompletedContractsPage from './components/MetricCards/CompletedContractsPage';
import ContractsExpiringInOneMonthPage from './components/MetricCards/ContractsExpiringInOneMonthPage';
import PrivateRoute from './components/Login/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/phone-verification" element={<PhoneVerification />} />
          <Route path="/vendors" element={<PrivateRoute><VendorList /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardOverview /></PrivateRoute>} />
          <Route path="/active-vendors" element={<PrivateRoute><ActiveVendorsPage /></PrivateRoute>} />
          <Route path="/expired-contracts" element={<PrivateRoute><CompletedContractsPage /></PrivateRoute>} />
          <Route path="/expiring-in-one-month" element={<PrivateRoute><ContractsExpiringInOneMonthPage /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
