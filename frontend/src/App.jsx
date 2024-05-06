import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import UpdateAlbem from './pages/UpdateAlbem'
import AlbemPage from './pages/AlbemPage'
import Search from './pages/Search'
import CreateAlbem from './pages/CreateAlbem'


export default function App() {
  return (
    
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={ <Home/> }/>
        <Route path="/sign-up" element={ <SignUp/> }/>
        <Route path="/sign-in" element={ <Signin/> }/>
        <Route path='/search' element={<Search />} />
        <Route path='/albem/:albemSlug' element={<AlbemPage />} />
        
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/create-albem' element={<CreateAlbem />} />
        <Route path='/update-albem/:albemId' element={<UpdateAlbem />} />
  

      </Routes>
    </BrowserRouter>
  )
}
