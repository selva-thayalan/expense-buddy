import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import './styles/Common.scss';
import './styles/Responsive.scss';
import Home from './pages/Home';
import Split from './pages/Split';
import AddExpense from './pages/expense/AddExpense';
import EditExpense from './pages/expense/EditExpense';
import { Provider } from 'react-redux';
import store from './store/store';
import CreateGroup from './pages/group/CreateGroup';
import MainHeader from './components/MainHeader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainHeader/>
      <body className="main-content">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/split/:splitId' element={<Split/>}>
            <Route path='add' element={<AddExpense/>} />
            <Route path='edit/:expenseId' element={<EditExpense/>} />
          </Route>
          <Route path='group'>
            <Route path='new' element={<CreateGroup/>} />
          </Route>
        </Routes>
      </body>
    </BrowserRouter>
  </Provider>
);
