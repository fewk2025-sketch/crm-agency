import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('admin@agency.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Try: admin@agency.com / password');
    }
  };

  const demoUsers = [
    { email: 'admin@agency.com', role: 'Admin' },
    { email: 'manager@agency.com', role: 'Manager' },
    { email: 'agent@agency.com', role: 'Agent' },
    { email: 'viewer@agency.com', role: 'Viewer' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">AgencyCRM</h1>
          <p className="text-gray-600">Marketing Agency Management Platform</p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign In</h2>
              <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            
            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign In
            </Button>
          </form>
        </Card>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</h3>
          <div className="grid grid-cols-2 gap-2">
            {demoUsers.map((user) => (
              <button
                key={user.email}
                onClick={() => setEmail(user.email)}
                className="p-2 text-xs bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
              >
                <span className="font-medium text-gray-900">{user.role}</span>
                <br />
                <span className="text-gray-500">{user.email}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">All accounts use password: <code className="bg-gray-100 px-1 rounded">password</code></p>
        </div>
      </div>
    </div>
  );
}
