import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import { currentAdmin, currentUser } from './functions/auth';
import StorePersonalInfo from './pages/admin/StorePersonalInfo';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AllBooksPage from './pages/general/AllBooksPage';
import MainPage from './pages/general/MainPage';
import StorePage from './pages/general/StorePage';
import OpenStore from './pages/user/OpenStore';
import { PersonalInfo } from './pages/user/PersonalInfo';
import AdminRoute from './route/AdminRoute';
import GeneralRoute from './route/GeneralRoute';
import UserRoute from './route/UserRoute';
import { login as loginAdmin } from './store/adminSlice';
import { login as loginUser } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  var { id } = useParams()
  const token = localStorage.getItem('token')
  console.log('token', token)
  currentUser(token).then(res => {
    console.log(res)
    dispatch(loginUser({
      username: res.data.username,
      id: res.data._id,
      haveStore: res.data.haveStore,
      token: token
    }))
    if (res.data.haveStore === true) {
      currentAdmin(token, res.data.username).then(res => {
        console.log('admin ', res)
        dispatch(loginAdmin({
          id: res.data._id,
          name: res.data.name
        }))
      })
    }
  }).catch(err => console.log(err))
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <GeneralRoute>
              <MainPage />
            </GeneralRoute>}
          />
          <Route path='/store' element={
            <GeneralRoute>
              <StorePage />
            </GeneralRoute>}
          />
          <Route path='/category' element={
            <GeneralRoute>
              <AllBooksPage />
            </GeneralRoute>}
          />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/open_store/:id' element={
            <UserRoute>
              <OpenStore />
            </UserRoute>}
          />
          <Route path='/personalinfo' element={
            <UserRoute>
              <PersonalInfo />
            </UserRoute>}
          />
          <Route path='/storeinfo/:id' element={
            <AdminRoute>
              <StorePersonalInfo />
            </AdminRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
