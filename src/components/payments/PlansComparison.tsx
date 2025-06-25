
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      'Drag & drop editor',
      'Basic components',
      'PNG export',
      '3 projects',
      'Community support'
    ],
    buttonText: 'Start Free',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Everything you need to scale',
    features: [
      'Everything in Free',
      'HTML/CSS export',
      'React component export',
      'Unlimited projects',
      'Premium templates',
      'Priority support',
      'Custom branding'
    ],
    buttonText: 'Start Pro Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'SSO integration',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee'
    ],
    buttonText: 'Contact Sales',
    popular: false
  }
];

interface PlansComparisonProps {
  onSelectPlan?: (planName: string, price: string) => void;
}

export const PlansComparison = ({ onSelectPlan }: PlansComparisonProps) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent">
              Choose your plan
            </span>
          </h2>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Start free and upgrade as you grow. All plans include our core features.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative bg-slate-900/60 backdrop-blur-xl border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-500 border-purple-500/50 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-semibold text-white">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && <span className="text-slate-400">/month</span>}
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-slate-200">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600'
                  } transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
                  size="lg"
                  onClick={() => onSelectPlan?.(plan.name, plan.price)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
