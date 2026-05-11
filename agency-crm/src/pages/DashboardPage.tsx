import { useEffect } from 'react';
import { Users, Megaphone, CheckSquare, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { StatCard } from '../../components/ui/Card';
import { Card } from '../../components/ui/Card';
import { getStatusBadge } from '../../components/ui/Badge';

export function DashboardPage() {
  const { stats, clients, campaigns, tasks, fetchStats, fetchClients, fetchCampaigns, fetchTasks } = useDataStore();

  useEffect(() => {
    fetchStats();
    fetchClients();
    fetchCampaigns();
    fetchTasks();
  }, [fetchStats, fetchClients, fetchCampaigns, fetchTasks]);

  const recentClients = clients.slice(0, 5);
  const recentTasks = tasks.filter(t => t.status !== 'done').slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's an overview of your agency.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value={stats?.totalClients || 0}
          change={12}
          icon={<Users className="h-6 w-6 text-primary-600" />}
        />
        <StatCard
          title="Active Campaigns"
          value={stats?.activeCampaigns || 0}
          change={8}
          icon={<Megaphone className="h-6 w-6 text-secondary-600" />}
        />
        <StatCard
          title="Pending Tasks"
          value={stats?.pendingTasks || 0}
          change={-5}
          icon={<CheckSquare className="h-6 w-6 text-orange-600" />}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${(stats?.monthlyRevenue || 0).toLocaleString()}`}
          change={23}
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Active Clients"
          value={stats?.activeClients || 0}
          icon={<Users className="h-6 w-6 text-purple-600" />}
        />
        <StatCard
          title="Total Tasks"
          value={stats?.totalTasks || 0}
          icon={<Clock className="h-6 w-6 text-pink-600" />}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <Card title="Recent Clients">
          <div className="space-y-4">
            {recentClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.company}</p>
                </div>
                {getStatusBadge(client.status)}
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card title="Pending Tasks">
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    {task.clientName && `Client: ${task.clientName}`}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(task.priority)}
                  {getStatusBadge(task.status)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Campaign Overview */}
      <Card title="Campaign Overview">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Campaign</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Budget</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Spent</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.slice(0, 5).map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{campaign.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{campaign.clientName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 capitalize">{campaign.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">${campaign.budget.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">${campaign.spent.toLocaleString()}</td>
                  <td className="py-3 px-4">{getStatusBadge(campaign.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
