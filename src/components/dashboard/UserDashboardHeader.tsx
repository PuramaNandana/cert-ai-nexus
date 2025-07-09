
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UserDashboardHeaderProps {
  user: {
    name: string;
    role: string;
  };
}

const UserDashboardHeader = ({ user }: UserDashboardHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('digilocker_connected');
    navigate('/');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
              <p className="text-gray-500 font-medium">Document Verification Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome back,</p>
              <p className="text-sm text-gray-500">{user.name}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="rounded-lg border-gray-300 hover:border-gray-400">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserDashboardHeader;
