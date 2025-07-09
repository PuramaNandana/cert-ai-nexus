
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, FileCheck, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'hr' | 'user'>('hr');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store user session
    localStorage.setItem('user', JSON.stringify({
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: email.split('@')[0]
    }));

    toast({
      title: 'Login Successful',
      description: `Welcome to the ${role === 'hr' ? 'HR' : 'User'} portal!`,
    });

    // Navigate based on role
    if (role === 'hr') {
      navigate('/hr-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VerifyPro</h1>
          <p className="text-gray-600">AI-Powered Document Verification Platform</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Access your verification portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={role} onValueChange={(value) => setRole(value as 'hr' | 'user')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="hr" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  HR Portal
                </TabsTrigger>
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  User Portal
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign In to {role === 'hr' ? 'HR' : 'User'} Portal
                  </Button>
                </div>
              </form>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>HR: hr@company.com / password</p>
                  <p>User: user@email.com / password</p>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
