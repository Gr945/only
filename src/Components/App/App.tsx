import React from 'react';
import './App.css';
import data from '../../data.json'
import HistoryData from '../HistoryData/HistoryData';

function App() {
  return (
    <div className="App">
      <div style={{width:'250px', height: '100vh', borderRight: '2px solid #DDDEE0FF' }}></div>
      <HistoryData data={data} points={6}/>
      <div style={{ width: '150px', height: '100vh', borderLeft: '2px solid #DDDEE0FF' }}></div>
    </div>
  );
}

export default App;
