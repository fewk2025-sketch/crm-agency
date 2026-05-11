import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}

export function getStatusBadge(status: string) {
  const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    // Client statuses
    active: { variant: 'success', label: 'Active' },
    inactive: { variant: 'default', label: 'Inactive' },
    prospect: { variant: 'info', label: 'Prospect' },
    
    // Campaign statuses
    draft: { variant: 'default', label: 'Draft' },
    paused: { variant: 'warning', label: 'Paused' },
    completed: { variant: 'success', label: 'Completed' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
    
    // Task statuses
    todo: { variant: 'default', label: 'To Do' },
    'in-progress': { variant: 'info', label: 'In Progress' },
    review: { variant: 'warning', label: 'Review' },
    done: { variant: 'success', label: 'Done' },
    
    // Task priorities
    low: { variant: 'default', label: 'Low' },
    medium: { variant: 'info', label: 'Medium' },
    high: { variant: 'warning', label: 'High' },
    urgent: { variant: 'danger', label: 'Urgent' },
  };
  
  const config = statusConfig[status] || { variant: 'default' as const, label: status };
  
  return (
    <Badge variant={config.variant}>{config.label}</Badge>
  );
}
