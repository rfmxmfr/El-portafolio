import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminProvider, useAdmin } from '../context/AdminContext';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock components
const MockComponent = () => {
  const { isAdmin, login, logout } = useAdmin();
  return (
    <div>
      <p>Is Admin: {isAdmin ? 'Yes' : 'No'}</p>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// Mock axios responses
const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockAxios.get.mockClear();
  mockAxios.post.mockClear();
});

describe('AdminContext', () => {
  it('should initialize with correct default state', async () => {
    mockAxios.get.mockResolvedValue({ data: { role: 'admin' } });

    render(
      <AdminProvider>
        <MockComponent />
      </AdminProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Is Admin: Yes')).toBeInTheDocument();
    });
  });

  it('should handle login successfully', async () => {
    const mockUser = { email: 'test@example.com', role: 'admin' };
    mockAxios.post.mockResolvedValue({ data: mockUser });

    render(
      <AdminProvider>
        <MockComponent />
      </AdminProvider>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Is Admin: Yes')).toBeInTheDocument();
    });
  });

  it('should handle login failure', async () => {
    mockAxios.post.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });

    render(
      <AdminProvider>
        <MockComponent />
      </AdminProvider>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Is Admin: No')).toBeInTheDocument();
    });
  });

  it('should handle logout', async () => {
    mockAxios.get.mockResolvedValue({ data: { role: 'admin' } });
    mockAxios.post.mockResolvedValue({});

    render(
      <AdminProvider>
        <MockComponent />
      </AdminProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Is Admin: Yes')).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await userEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByText('Is Admin: No')).toBeInTheDocument();
    });
  });
});
