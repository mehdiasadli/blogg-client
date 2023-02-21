import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import { useAuth } from '../../hooks/useAuth'

import Private from './Private'
import { Fragment } from 'react'

const Router = () => {
  const { isLoggedIn } = useAuth()

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.label}
          path={route.path}
          element={
            route.private ? (
              <Private value={isLoggedIn} element={route.element} to={route.to} />
            ) : (
              <Private value={!isLoggedIn} element={route.element} to={route.to} />
            )
          }
        >
          {route.children &&
            route.children.map((child) => (
              <Fragment key={child.label}>
                {child.path === 'index' ? (
                  <Route index element={child.element} />
                ) : (
                  <Route path={child.path} element={child.element} />
                )}
              </Fragment>
            ))}
        </Route>
      ))}
    </Routes>
  )
}

export default Router
