
//components
import React from 'react';
import Home from './components/home';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}

export default App;