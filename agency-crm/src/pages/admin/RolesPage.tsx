import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Permission } from '../../types';

const allPermissions: Permission[] = [
  // Client permissions
  'clients:view', 'clients:create', 'clients:edit', 'clients:delete',
  // Campaign permissions
  'campaigns:view', 'campaigns:create', 'campaigns:edit', 'campaigns:delete',
  // Task permissions
  'tasks:view', 'tasks:create', 'tasks:edit', 'tasks:delete',
  // User permissions
  'users:view', 'users:create', 'users:edit', 'users:delete',
  // Other permissions
  'reports:view', 'settings:manage',
];

const roleDefaultPermissions: Record<string, Permission[]> = {
  admin: allPermissions,
  manager: [
    'clients:view', 'clients:create', 'clients:edit',
    'campaigns:view', 'campaigns:create', 'campaigns:edit',
    'tasks:view', 'tasks:create', 'tasks:edit', 'tasks:delete',
    'users:view', 'reports:view',
  ],
  agent: [
    'clients:view',
    'campaigns:view',
    'tasks:view', 'tasks:create', 'tasks:edit',
  ],
  viewer: ['clients:view', 'campaigns:view', 'tasks:view', 'reports:view'],
};

export function AdminRolesPage() {
  const { user } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState('admin');
  const [permissions, setPermissions] = useState<Permission[]>(roleDefaultPermissions['admin']);

  const roles = ['admin', 'manager', 'agent', 'viewer'];

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setPermissions(roleDefaultPermissions[role] || []);
  };

  const togglePermission = (permission: Permission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const canManage = user?.role === 'admin';

  const permissionGroups = {
    Clients: ['clients:view', 'clients:create', 'clients:edit', 'clients:delete'] as Permission[],
    Campaigns: ['campaigns:view', 'campaigns:create', 'campaigns:edit', 'campaigns:delete'] as Permission[],
    Tasks: ['tasks:view', 'tasks:create', 'tasks:edit', 'tasks:delete'] as Permission[],
    Users: ['users:view', 'users:create', 'users:edit', 'users:delete'] as Permission[],
    Other: ['reports:view', 'settings:manage'] as Permission[],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
        <p className="mt-1 text-gray-600">Configure role-based access control</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <Card title="Roles">
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                disabled={!canManage && role !== 'viewer'}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedRole === role
                    ? 'bg-primary-50 text-primary-700 border-2 border-primary-200'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{role}</span>
                  {selectedRole === role && <Badge variant="info">Selected</Badge>}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {roleDefaultPermissions[role]?.length || 0} permissions
                </p>
              </button>
            ))}
          </div>
        </Card>

        {/* Permissions Configuration */}
        <Card 
          title={`${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Permissions`}
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            {Object.entries(permissionGroups).map(([group, groupPermissions]) => (
              <div key={group}>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{group}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {groupPermissions.map((permission) => {
                    const isEnabled = permissions.includes(permission);
                    const action = permission.split(':')[1];
                    return (
                      <button
                        key={permission}
                        onClick={() => canManage && togglePermission(permission)}
                        disabled={!canManage}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isEnabled
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        } ${!canManage ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-50'}`}
                      >
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {canManage && (
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </div>
          )}

          {!canManage && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                You need admin privileges to modify role permissions.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Permission Matrix Summary */}
      <Card title="Permission Matrix Summary">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Permission</th>
                {roles.map((role) => (
                  <th key={role} className="text-center py-3 px-4 font-semibold text-gray-700 capitalize">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPermissions.map((permission) => (
                <tr key={permission} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">
                    {permission.replace(':', '.')}
                  </td>
                  {roles.map((role) => {
                    const hasPermission = roleDefaultPermissions[role]?.includes(permission);
                    return (
                      <td key={role} className="text-center py-3 px-4">
                        {hasPermission ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
                            ×
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
