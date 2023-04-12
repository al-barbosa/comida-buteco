import React, { useState, useEffect } from 'react';
import Header from './components/header';
import BarDataI from './interfaces/barInterface';
import './App.css';

function App() {
  const [bares, setBares] = useState<BarDataI[]>([]);
  // const cidade = 'Montes-Claros';
  // const getInfo = async () => {
  //   const URL =`http://127.0.0.1:8000/${cidade}`;
  //   const response = await fetch(URL, {
  //     method: "GET",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await response.json();
  //   return data;
  // }
  // getInfo()
  return (
    <div className="App">
      <Header setBares={ setBares } />
    </div>
  );
}

export default App;
