import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import { amplifyConfig } from './amplify-config'
import './index.css'
import './lib/i18n.js'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import DesignTools from './pages/DesignTools.jsx'

// Configure Amplify
Amplify.configure(amplifyConfig)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/design-tools',
    element: <DesignTools />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)