import { create } from 'zustand';
import { Client, Campaign, Task, DashboardStats, ActivityLog } from '../types';

interface DataState {
  clients: Client[];
  campaigns: Campaign[];
  tasks: Task[];
  activities: ActivityLog[];
  stats: DashboardStats | null;
  isLoading: boolean;
  
  // Clients
  fetchClients: () => Promise<void>;
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Campaigns
  fetchCampaigns: () => Promise<void>;
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  
  // Tasks
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Stats
  fetchStats: () => Promise<void>;
}

// Mock data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Tech Corp',
    email: 'john@techcorp.com',
    phone: '+1234567890',
    status: 'active',
    industry: 'Technology',
    website: 'https://techcorp.com',
    assignedTo: '2',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Fashion Hub',
    email: 'jane@fashionhub.com',
    phone: '+0987654321',
    status: 'active',
    industry: 'Fashion',
    website: 'https://fashionhub.com',
    assignedTo: '3',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Bob Wilson',
    company: 'Foodie Inc',
    email: 'bob@foodieinc.com',
    status: 'prospect',
    industry: 'Food & Beverage',
    assignedTo: '2',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date(),
  },
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Brand Awareness',
    clientId: '1',
    clientName: 'Tech Corp',
    type: 'social',
    status: 'active',
    budget: 50000,
    spent: 32000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
    description: 'Social media campaign for brand awareness',
    metrics: {
      impressions: 150000,
      clicks: 8500,
      conversions: 420,
      ctr: 5.67,
      cpc: 3.76,
      roi: 245,
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Email Marketing Blitz',
    clientId: '2',
    clientName: 'Fashion Hub',
    type: 'email',
    status: 'active',
    budget: 20000,
    spent: 12500,
    startDate: new Date('2024-02-01'),
    description: 'Email marketing campaign for spring collection',
    metrics: {
      impressions: 50000,
      clicks: 3200,
      conversions: 180,
      ctr: 6.4,
      cpc: 3.9,
      roi: 320,
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'SEO Optimization',
    clientId: '1',
    clientName: 'Tech Corp',
    type: 'seo',
    status: 'completed',
    budget: 30000,
    spent: 28000,
    startDate: new Date('2023-10-01'),
    endDate: new Date('2024-01-31'),
    description: 'Complete SEO overhaul',
    metrics: {
      impressions: 200000,
      clicks: 15000,
      conversions: 800,
      roi: 450,
    },
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date(),
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Create social media content calendar',
    description: 'Plan content for Q2 across all platforms',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2024-04-15'),
    assignedTo: '3',
    assignedToName: 'Agent User',
    clientId: '1',
    clientName: 'Tech Corp',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Review campaign performance report',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date('2024-04-20'),
    assignedTo: '2',
    assignedToName: 'Manager User',
    clientId: '2',
    clientName: 'Fashion Hub',
    campaignId: '2',
    campaignName: 'Email Marketing Blitz',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Client meeting preparation',
    description: 'Prepare quarterly review presentation',
    status: 'done',
    priority: 'urgent',
    dueDate: new Date('2024-04-10'),
    completedAt: new Date('2024-04-09'),
    assignedTo: '2',
    assignedToName: 'Manager User',
    clientId: '1',
    clientName: 'Tech Corp',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date(),
  },
];

export const useDataStore = create<DataState>((set) => ({
  clients: [],
  campaigns: [],
  tasks: [],
  activities: [],
  stats: null,
  isLoading: false,

  fetchClients: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 300));
    set({ clients: mockClients, isLoading: false });
  },

  addClient: (client) => {
    const newClient: Client = {
      ...client,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ clients: [...state.clients, newClient] }));
  },

  updateClient: (id, client) => {
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === id ? { ...c, ...client, updatedAt: new Date() } : c
      ),
    }));
  },

  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter((c) => c.id !== id),
    }));
  },

  fetchCampaigns: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 300));
    set({ campaigns: mockCampaigns, isLoading: false });
  },

  addCampaign: (campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ campaigns: [...state.campaigns, newCampaign] }));
  },

  updateCampaign: (id, campaign) => {
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, ...campaign, updatedAt: new Date() } : c
      ),
    }));
  },

  deleteCampaign: (id) => {
    set((state) => ({
      campaigns: state.campaigns.filter((c) => c.id !== id),
    }));
  },

  fetchTasks: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 300));
    set({ tasks: mockTasks, isLoading: false });
  },

  addTask: (task) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: (id, task) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...task, updatedAt: new Date() } : t
      ),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },

  fetchStats: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const stats: DashboardStats = {
      totalClients: mockClients.length,
      activeClients: mockClients.filter((c) => c.status === 'active').length,
      totalCampaigns: mockCampaigns.length,
      activeCampaigns: mockCampaigns.filter((c) => c.status === 'active').length,
      totalTasks: mockTasks.length,
      pendingTasks: mockTasks.filter((t) => t.status !== 'done').length,
      totalRevenue: mockCampaigns.reduce((sum, c) => sum + c.budget, 0),
      monthlyRevenue: mockCampaigns
        .filter((c) => c.status === 'active')
        .reduce((sum, c) => sum + c.spent, 0),
    };
    
    set({ stats, isLoading: false });
  },
}));
