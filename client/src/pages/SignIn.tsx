import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Mail, Lock, Github, Chrome, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to ComponentForge.",
      });
      setIsLoading(false);
      navigate('/editor');
    }, 1500);
  };

  const handleSocialSignIn = (provider: string) => {
    toast({
      title: `${provider} Sign In`,
      description: "Social sign-in will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      
      {/* Sign In Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-purple-500/20 mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400">
                Sign in to continue building amazing landing pages
              </p>
            </div>

            {/* Sign In Form */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10 pr-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({...formData, rememberMe: checked as boolean})}
                    className="border-slate-600 data-[state=checked]:bg-purple-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                    Remember me for 30 days
                  </Label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <Separator className="flex-1 bg-slate-700" />
                <span className="text-sm text-gray-500">OR</span>
                <Separator className="flex-1 bg-slate-700" />
              </div>

              {/* Social Sign In */}
              <div className="space-y-3">
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full border-slate-700 hover:bg-slate-800 text-gray-300"
                  onClick={() => handleSocialSignIn('Google')}
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full border-slate-700 hover:bg-slate-800 text-gray-300"
                  onClick={() => handleSocialSignIn('GitHub')}
                >
                  <Github className="w-5 h-5 mr-2" />
                  Continue with GitHub
                </Button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-400 mt-8">
                Don't have an account?{' '}
                <Link to="/getting-started" className="text-purple-400 hover:text-purple-300 font-medium">
                  Get Started Free
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Reminder */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-8">
              Everything You Get with ComponentForge
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6">
                <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Free Plan
                </Badge>
                <ul className="space-y-2 text-left text-gray-400 text-sm">
                  <li>• 3 Active Projects</li>
                  <li>• Basic Components</li>
                  <li>• HTML/CSS Export</li>
                  <li>• Community Support</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6">
                <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Premium
                </Badge>
                <ul className="space-y-2 text-left text-gray-400 text-sm">
                  <li>• Unlimited Projects</li>
                  <li>• All Components</li>
                  <li>• React Export</li>
                  <li>• Priority Support</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6">
                <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Deluxe
                </Badge>
                <ul className="space-y-2 text-left text-gray-400 text-sm">
                  <li>• Everything in Premium</li>
                  <li>• White Label Export</li>
                  <li>• API Access</li>
                  <li>• Dedicated Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SignIn;