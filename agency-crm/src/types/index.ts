// User and Authentication Types
export type UserRole = 'admin' | 'manager' | 'agent' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Client Types
export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'prospect';
  industry?: string;
  website?: string;
  address?: string;
  notes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Campaign Types
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
export type CampaignType = 'email' | 'social' | 'ppc' | 'content' | 'seo' | 'other';

export interface Campaign {
  id: string;
  name: string;
  clientId: string;
  clientName?: string;
  type: CampaignType;
  status: CampaignStatus;
  budget: number;
  spent: number;
  startDate: Date;
  endDate?: Date;
  description?: string;
  metrics?: CampaignMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignMetrics {
  impressions?: number;
  clicks?: number;
  conversions?: number;
  ctr?: number;
  cpc?: number;
  roi?: number;
}

// Task Types
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  assignedTo?: string;
  assignedToName?: string;
  clientId?: string;
  clientName?: string;
  campaignId?: string;
  campaignName?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalTasks: number;
  pendingTasks: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: Date;
}

// Admin Types
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: Date;
}

export type Permission = 
  | 'clients:view'
  | 'clients:create'
  | 'clients:edit'
  | 'clients:delete'
  | 'campaigns:view'
  | 'campaigns:create'
  | 'campaigns:edit'
  | 'campaigns:delete'
  | 'tasks:view'
  | 'tasks:create'
  | 'tasks:edit'
  | 'tasks:delete'
  | 'users:view'
  | 'users:create'
  | 'users:edit'
  | 'users:delete'
  | 'reports:view'
  | 'settings:manage';

export interface RolePermissions {
  [key: string]: boolean;
}
