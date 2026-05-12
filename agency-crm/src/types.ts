// User roles
export type Role = 'admin' | 'manager' | 'agent' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  createdAt: Date;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'lead' | 'active' | 'inactive' | 'churned';
  assignedTo: string;
  value: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  clientId: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  platform: 'google' | 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId: string;
  dueDate: Date;
  clientId?: string;
  campaignId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  entityType: 'client' | 'campaign' | 'task' | 'user';
  entityId: string;
  timestamp: Date;
}

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  activeCampaigns: number;
  pendingTasks: number;
  conversionRate: number;
}

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: ['all'],
  manager: ['clients:read', 'clients:write', 'campaigns:read', 'campaigns:write', 'tasks:read', 'tasks:write', 'reports:read'],
  agent: ['clients:read', 'campaigns:read', 'tasks:read', 'tasks:write'],
  viewer: ['clients:read', 'campaigns:read', 'tasks:read'],
};
