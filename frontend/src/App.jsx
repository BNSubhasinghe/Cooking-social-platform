import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TipHome from './pages/TipHome';
import TipsList from './pages/TipsList';
import AddTip from './pages/AddTip';
import EditTip from './pages/EditTip';

function App() {
  return (

        <main>
          <Routes>
            <Route path="/" element={<TipHome />} />
            <Route path="/tips" element={<TipsList />} />
            <Route path="/tips/add" element={<AddTip />} />
            <Route path="/tips/:id/edit" element={<EditTip />} />
          </Routes>
        </main>
  );
}

export default App;
