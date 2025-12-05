// frontend/src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Optional: global styles
import './index.css'

// Create root and render App
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
