
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, FileCheck, Users, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'hr' | 'user'>('hr');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (role === 'hr' && !isOrganizationEmail(email)) {
      newErrors.email = 'HR users must use organization email (e.g., @company.com)';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isOrganizationEmail = (email: string) => {
    // Check for common organization domain patterns
    const orgDomains = ['company.com', 'corp.com', 'techcorp.com', 'enterprise.com'];
    const domain = email.split('@')[1];
    return orgDomains.includes(domain) || domain?.includes('corp') || domain?.includes('company');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate user ID based on role
      const userId = role === 'hr' ? `HR${Math.random().toString(36).substr(2, 6).toUpperCase()}` : `USR${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      // Store user session
      localStorage.setItem('user', JSON.stringify({
        id: userId,
        email,
        role,
        name: email.split('@')[0],
        company: role === 'hr' ? email.split('@')[1] : null
      }));

      toast({
        title: 'Login Successful',
        description: `Welcome to the ${role === 'hr' ? 'HR' : 'Candidate'} portal!`,
      });

      // Navigate based on role
      if (role === 'hr') {
        navigate('/hr-dashboard');
      } else {
        navigate('/user-dashboard');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Landing */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/landing')} 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to your VerifyPro account</p>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl dark:bg-slate-800">
          <CardHeader className="space-y-4">
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Choose your role and access your portal
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={role} onValueChange={(value) => setRole(value as 'hr' | 'user')}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-slate-700 p-1 rounded-xl">
                <TabsTrigger 
                  value="hr" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-sm"
                >
                  <Users className="h-4 w-4" />
                  HR Portal
                </TabsTrigger>
                <TabsTrigger 
                  value="user" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-sm"
                >
                  <FileCheck className="h-4 w-4" />
                  Candidate Portal
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {role === 'hr' ? 'Organization Email Address' : 'Email Address'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={role === 'hr' ? 'Enter your organization email' : 'Enter your email'}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({...errors, email: undefined});
                    }}
                    className={`mt-2 h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                  {role === 'hr' && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Must use organization email domain
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({...errors, password: undefined});
                      }}
                      className={`h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 pr-12 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl font-semibold text-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    `Sign In to ${role === 'hr' ? 'HR' : 'Candidate'} Portal`
                  )}
                </Button>
              </form>

              {/* Demo credentials */}
              <div className="mt-8 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border dark:border-slate-600">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Demo Credentials:</p>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">HR Portal:</span>
                    <span>hr@company.com / password</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Candidate Portal:</span>
                    <span>user@email.com / password</span>
                  </div>
                </div>
              </div>

              {/* Sign up link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                    Request Access
                  </a>
                </p>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
