import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllBooksPage from './pages/AllBooksPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import StorePage from './pages/StorePage';
import OpenStore from './pages/admin/OpenStore';
import { PersonalInfo } from './pages/customer/PersonalInfo';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/store' element={<StorePage />} />
          <Route path='/category' element={<AllBooksPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/open_store' element={<OpenStore />} />
          <Route path='/personalinfo' element={<PersonalInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
