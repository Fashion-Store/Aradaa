import * as React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      let success = false;
      
      if (isLoginMode) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(formData.name, formData.email, formData.password);
      }

      if (success) {
        navigate(from, { replace: true });
      } else {
        alert(isLoginMode ? 'Login failed. Please try again.' : 'Registration failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif font-light text-gray-900">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <p className="text-gray-600">
              {isLoginMode 
                ? 'Sign in to your account to continue shopping' 
                : 'Join Adaraa to start your premium fashion journey'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {!isLoginMode && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={isLoading}
              >
                {isLoading 
                  ? 'Processing...' 
                  : isLoginMode 
                    ? 'Sign In' 
                    : 'Create Account'
                }
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLoginMode 
                  ? "Don't have an account?" 
                  : "Already have an account?"
                }
                {' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-medium text-gray-900 hover:underline"
                >
                  {isLoginMode ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {isLoginMode && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guest Shopping Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600 mb-2">
            Want to continue shopping without an account?
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/shop')}
            className="w-full"
          >
            Continue as Guest
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
