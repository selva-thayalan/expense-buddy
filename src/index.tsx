import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import './styles/Common.scss';
import Home from './pages/Home';
import Split from './pages/Split';
import Expense from './pages/Expense';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/split/:id' element={<Split/>}>
        <Route path='add' element={<Expense/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
