import React, { useState } from 'react';
import Header from './components/header';
import Bares from './components/bares';
import BarDataI from './interfaces/barInterface';
import './App.css';

function App() {
  const [bares, setBares] = useState<BarDataI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="App">
      <Header
        setLoading={ setLoading }
        setBares={ setBares }
      />
      <Bares
        bares={ bares }
        loading={ loading }
      />
    </div>
  );
}

export default App;
