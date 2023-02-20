import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

import './index.css'
import './config/locale'

import { StoreProvider } from './context'
import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './config/query'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <QueryProvider>
          <App />
        </QueryProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
)
