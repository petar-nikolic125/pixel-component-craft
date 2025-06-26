import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, Mail, Lock, Building2, Sparkles, Rocket, 
  Crown, Check, ArrowRight, Github, Chrome
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const GettingStarted = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'deluxe'>('free');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    agreeToTerms: false
  });

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: <Sparkles className="w-6 h-6" />,
      price: '$0',
      features: [
        '3 active projects',
        'Basic components',
        'HTML/CSS export',
        'Community support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: <Rocket className="w-6 h-6" />,
      price: '$29/mo',
      badge: 'Most Popular',
      features: [
        'Unlimited projects',
        'All components',
        'React export',
        'Priority support',
        'Custom domains'
      ]
    },
    {
      id: 'deluxe',
      name: 'Deluxe',
      icon: <Crown className="w-6 h-6" />,
      price: '$99/mo',
      features: [
        'Everything in Premium',
        'White-label export',
        'API access',
        'Dedicated support',
        'Custom integrations'
      ]
    }
  ];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      toast({
        title: "Welcome to ComponentForge!",
        description: "Your account has been created successfully.",
      });
      setIsLoading(false);
      navigate('/editor');
    }, 2000);
  };

  const handleSocialSignUp = (provider: string) => {
    toast({
      title: `${provider} Sign Up`,
      description: "Social sign-up will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      
      {/* Getting Started Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Get Started with ComponentForge
              </h1>
              <p className="text-gray-400">
                Create your account in 3 simple steps
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={(currentStep / 3) * 100} className="h-2 bg-slate-800">
                <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300" />
              </Progress>
              <div className="flex justify-between mt-2">
                <span className={`text-sm ${currentStep >= 1 ? 'text-purple-400' : 'text-gray-500'}`}>
                  Account Info
                </span>
                <span className={`text-sm ${currentStep >= 2 ? 'text-purple-400' : 'text-gray-500'}`}>
                  Choose Plan
                </span>
                <span className={`text-sm ${currentStep >= 3 ? 'text-purple-400' : 'text-gray-500'}`}>
                  Complete Setup
                </span>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Account Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white mb-6">Create Your Account</h2>
                    
                    {/* Social Sign Up */}
                    <div className="space-y-3">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full border-slate-700 hover:bg-slate-800 text-gray-300"
                        onClick={() => handleSocialSignUp('Google')}
                      >
                        <Chrome className="w-5 h-5 mr-2" />
                        Continue with Google
                      </Button>
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full border-slate-700 hover:bg-slate-800 text-gray-300"
                        onClick={() => handleSocialSignUp('GitHub')}
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Continue with GitHub
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 my-6">
                      <div className="flex-1 h-px bg-slate-700" />
                      <span className="text-sm text-gray-500">OR</span>
                      <div className="flex-1 h-px bg-slate-700" />
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                    </div>

                    <Button 
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Choose Plan */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white mb-6">Choose Your Plan</h2>
                    
                    <div className="grid gap-4">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id as any)}
                          className={`relative border rounded-lg p-6 cursor-pointer transition-all ${
                            selectedPlan === plan.id
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-slate-700 hover:border-purple-500/50'
                          }`}
                        >
                          {plan.badge && (
                            <Badge className="absolute top-4 right-4 bg-purple-600 text-white">
                              {plan.badge}
                            </Badge>
                          )}
                          
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${
                              selectedPlan === plan.id ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700/50 text-gray-400'
                            }`}>
                              {plan.icon}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                                <span className="text-2xl font-bold text-white">{plan.price}</span>
                              </div>
                              
                              <ul className="space-y-1">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handlePreviousStep}
                        className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button 
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Complete Setup */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white mb-6">Complete Your Setup</h2>
                    
                    {/* Company Name (Optional) */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-gray-300">
                        Company Name <span className="text-gray-500">(Optional)</span>
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Acme Inc."
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 space-y-4">
                      <h3 className="font-medium text-white">Account Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Email</span>
                          <span className="text-white">{formData.email || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Selected Plan</span>
                          <span className="text-white capitalize">{selectedPlan}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Price</span>
                          <span className="text-white">
                            {plans.find(p => p.id === selectedPlan)?.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                          className="mt-1 rounded border-slate-600 bg-slate-900/50 text-purple-600 focus:ring-purple-500"
                          required
                        />
                        <span className="text-sm text-gray-400">
                          I agree to the{' '}
                          <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                            Terms of Service
                          </Link>
                          {' '}and{' '}
                          <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handlePreviousStep}
                        className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        disabled={!formData.agreeToTerms || isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {/* Sign In Link */}
              {currentStep === 1 && (
                <p className="text-center text-gray-400 mt-8">
                  Already have an account?{' '}
                  <Link to="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign In
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GettingStarted;