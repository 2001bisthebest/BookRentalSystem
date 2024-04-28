import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import { currentAdmin, currentUser } from './functions/auth';
import AllQueueBook from './pages/admin/AllQueueBook';
import OrderCheck from './pages/admin/OrderCheck';
import OrderReturn from './pages/admin/OrderReturn';
import OrderShipping from './pages/admin/OrderShipping';
import QueueBook from './pages/admin/QueueBook';
import StatusBookAdmin from './pages/admin/StatusBook';
import StorePersonalInfo from './pages/admin/StorePersonalInfo';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AllBooksPage from './pages/general/AllBooksPage';
import BookPage from './pages/general/BookPage';
import CategoryPage from './pages/general/CategoryPage';
import MainPage from './pages/general/MainPage';
import StorePage from './pages/general/StorePage';
import CartPage from './pages/user/CartPage';
import OpenStore from './pages/user/OpenStore';
import { PersonalInfo } from './pages/user/PersonalInfo';
import ReservationPage from './pages/user/ReservationPage';
import StatusBook from './pages/user/StatusBook';
import AdminRoute from './route/AdminRoute';
import GeneralRoute from './route/GeneralRoute';
import UserRoute from './route/UserRoute';
import { login as loginAdmin } from './store/adminSlice';
import { login as loginUser } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  var { id, category, status } = useParams()
  const token = localStorage.getItem('token')
  console.log('token', token)
  if (token) {
    currentUser(token).then(res => {
      dispatch(loginUser({
        username: res.data.username,
        id: res.data._id,
        haveStore: res.data.haveStore,
        token: token
      }))
      if (res.data.haveStore === true) {
        currentAdmin(token, res.data.username).then(res => {
          // console.log('admin ', res)
          dispatch(loginAdmin({
            id: res.data._id,
            name: res.data.name
          }))
        })
      }
      // localStorage.clear()
    }).catch(err => console.log(err))
  }

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
          <Route path={'/category/:category'} element={
            <GeneralRoute>
              <CategoryPage />
            </GeneralRoute>
          } />
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
          <Route path='/book/:id' element={
            <GeneralRoute>
              <BookPage />
            </GeneralRoute>
          } />
          <Route path='/reservation/:id' element={
            <UserRoute>
              <ReservationPage />
            </UserRoute>
          } />
          <Route path='/cart/:id' element={
            <UserRoute>
              <CartPage />
            </UserRoute>
          } />
          <Route path="/status/:status" element={
            <UserRoute>
              <StatusBook initialStatus="reserved" />
            </UserRoute>
          } />
          <Route path='/statusbookadmin/:id' element={
            <AdminRoute>
              <StatusBookAdmin />
            </AdminRoute>
          } />
          <Route path='/queuebookadmin/:id' element={
            <AdminRoute>
              <QueueBook />
            </AdminRoute>
          } />
          <Route path='/allqueuebookadmin' element={
            <AdminRoute>
              <AllQueueBook />
            </AdminRoute>
          } />
          <Route path='/orderforcheck/:id' element={
            <AdminRoute>
              <OrderCheck />
            </AdminRoute>
          } />
          <Route path='/orderforshipping/:id' element={
            <AdminRoute>
              <OrderShipping />
            </AdminRoute>
          } />
          <Route path='/orderforreturn/:id' element={
            <AdminRoute>
              <OrderReturn />
            </AdminRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
