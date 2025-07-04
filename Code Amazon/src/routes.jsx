import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import apiClient from './services/apiClient';

// Lazy load components for better performance
const App = lazy(() => import('./App.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const FlipLogin = lazy(() => import('./pages/FlipLogin.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const AdminWithReactAdmin = lazy(() => import('./pages/AdminWithReactAdmin.jsx'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-neutral-300 border-t-neutral-800 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-neutral-600">Loading...</p>
    </div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }) => {
  const user = apiClient.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/flip-login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FlipLogin />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Admin />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/react-admin',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <AdminWithReactAdmin />
        </Suspense>
      </ProtectedRoute>
    )
  }
]);

export default router;