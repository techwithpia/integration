import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Fa from './components/FeedAnalyzer';
import Ec from './components/EAFCodes';
import Fs from './components/FileStaging';
import Ss from './components/SystemStatus';
import BPC from './components/BPCLogs';
import Dt from './components/DynamicTab';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
      <Route path="/feed-analyzer" element={<Fa />} />
      <Route path="/user-profiles" element={<Dt />} />
      <Route path="/eaf-codes" element={<Ec />} />
      <Route path="/file-staging" element={<Fs />} />
      <Route path="/system-status" element={<Ss />} />
      <Route path="/bpc-logs" element={<BPC />} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
