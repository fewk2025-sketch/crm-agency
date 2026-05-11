import { create } from 'zustand';
import { User, AuthState } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@agency.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'manager@agency.com',
    name: 'Manager User',
    role: 'manager',
    createdAt: new Date(),
  },
  {
    id: '3',
    email: 'agent@agency.com',
    name: 'Agent User',
    role: 'agent',
    createdAt: new Date(),
  },
  {
    id: '4',
    email: 'viewer@agency.com',
    name: 'Viewer User',
    role: 'viewer',
    createdAt: new Date(),
  },
];

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const user = mockUsers.find((u) => u.email === email);
    
    if (user && password === 'password') {
      set({ 
        user: { ...user, lastLogin: new Date() }, 
        isAuthenticated: true, 
        isLoading: false 
      });
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      set({ isLoading: false });
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('auth_user');
  },

  updateUser: (user: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    }));
  },
}));

// Initialize auth state from localStorage
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('auth_user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      useAuthStore.setState({ user, isAuthenticated: true });
    } catch (e) {
      localStorage.removeItem('auth_user');
    }
  }
}
