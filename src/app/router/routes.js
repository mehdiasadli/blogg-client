import Auth from '../components/layouts/Auth'
import Home from '../components/layouts/Home'
import Blog from '../views/Blog'
import Collections from '../views/Collections'
import Feed from '../views/Feed'
import Login from '../views/Login'
import Profile from '../views/Profile'
import Register from '../views/Register'
import Settings from '../views/Settings'
import User from '../views/User'
import Write from '../views/Write'

export const routes = [
  {
    name: 'Home',
    label: 'home',
    path: '/',
    element: <Home />,
    private: true,
    to: '/auth',
    children: [
      {
        name: 'Feed',
        label: 'feed',
        path: 'index',
        element: <Feed />
      },
      {
        name: 'Profile',
        label: 'profile',
        path: 'profile',
        element: <Profile />
      },
      {
        name: 'Write',
        label: 'write',
        path: 'write',
        element: <Write />
      },
      {
        name: 'Settings',
        label: 'settings',
        path: 'settings',
        element: <Settings />
      },
      {
        name: 'Collection',
        label: 'collection',
        path: 'collection/:id',
        element: <Collections />
      },
      {
        name: 'Blog',
        label: 'blog',
        path: 'blog/:id',
        element: <Blog />
      },
      {
        name: 'User',
        label: 'user',
        path: 'user/:username',
        element: <User />
      }
    ]
  },
  {
    name: 'Auth',
    label: 'auth',
    path: '/auth',
    element: <Auth />,
    private: false,
    to: '/',
    children: [
      {
        name: 'Login',
        label: 'login',
        path: 'index',
        element: <Login />
      },
      {
        name: 'Register',
        label: 'register',
        path: 'register',
        element: <Register />
      }
    ]
  }
]
