import { Routes, Route } from 'react-router-dom'

import Auth from '../components/layouts/Auth'
import Login from '../views/Login'
import Register from '../views/Register'

import Home from '../components/layouts/Home'
import Feed from '../views/Feed'
import Profile from '../views/Profile'
import Collections from '../views/Collections'
import Private from './Private'
import Write from '../views/Write'
import Blog from '../views/Blog'
import Blogs from '../views/Blogs'

import { useAuth } from '../../hooks/useAuth'
import User from '../views/User'
import Settings from '../views/Settings'

const Router = () => {
  const { isLoggedIn } = useAuth()

  return (
    <Routes>
      <Route path='/' exact element={<Private value={isLoggedIn} element={<Home />} to='/auth' />}>
        <Route index element={<Feed />} />
        <Route path='profile' element={<Profile />} />
        <Route path='write' element={<Write />} />
        <Route path='blogs' element={<Blogs />} />
        <Route path='settings' element={<Settings />} />
        <Route path='collection/:id' element={<Collections />} />
        <Route path='blog/:id' element={<Blog />} />
        <Route path='user/:username' element={<User />} />
      </Route>
      <Route path='/auth' element={<Private value={!isLoggedIn} element={<Auth />} to='/' />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Router
