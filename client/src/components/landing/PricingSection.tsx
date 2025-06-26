
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

export const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Simple, transparent
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-500 border-purple-500/50' : ''
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
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  } transition-all duration-300 hover:scale-105`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 backdrop-blur-xl max-w-4xl mx-auto">
            <div className="p-12">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Need something custom?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                We work with enterprises to create tailored solutions that fit your unique requirements and scale with your business.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/25 hover:scale-105 transition-all duration-300"
              >
                Schedule a Demo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
