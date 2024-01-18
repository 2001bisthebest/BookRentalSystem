import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import StorePage from './pages/StorePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/store' element={<StorePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
