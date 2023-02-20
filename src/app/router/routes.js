export const routes = [
  {
    name: 'Home',
    label: 'home',
    path: '/',
    element: null,
    value: null,
    to: null,
    children: [
      {
        name: 'Feed',
        label: 'feed',
        path: 'index',
        element: null,
        value: null,
        to: null
      },
      {
        name: 'Profile',
        label: 'profile',
        path: 'profile',
        element: null,
        value: null,
        to: null
      }
    ]
  },
  {
    name: 'Auth',
    label: 'auth',
    path: '/auth',
    element: null,
    value: null,
    to: null,
    children: [
      {
        name: 'Login',
        label: 'login',
        path: 'index',
        element: null,
        value: null,
        to: null
      },
      {
        name: 'Register',
        label: 'register',
        path: 'register',
        element: null,
        value: null,
        to: null
      }
    ]
  }
]
