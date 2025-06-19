import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import './index.css'
import './i18n.js'

// Use lazy loading for admin pages to improve initial load time
const Admin = lazy(() => import('./pages/Admin.jsx'))
const AdminWithReactAdmin = lazy(() => import('./pages/AdminWithReactAdmin.jsx'))

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-neutral-50">
    <div className="text-center">
      <p className="text-neutral-600">Loading...</p>
    </div>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Admin />
      </Suspense>
    )
  },
  {
    path: '/admin-react',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminWithReactAdmin />
      </Suspense>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)