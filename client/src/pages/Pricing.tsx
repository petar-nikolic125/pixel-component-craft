import React, { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Sparkles, Rocket, Crown } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      icon: <Sparkles className="w-6 h-6" />,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for trying out ComponentForge',
      features: [
        { text: '3 active projects', included: true },
        { text: 'Basic components library', included: true },
        { text: 'HTML/CSS export', included: true },
        { text: 'Community support', included: true },
        { text: 'ComponentForge subdomain', included: true },
        { text: 'React export', included: false },
        { text: 'Custom domains', included: false },
        { text: 'Team collaboration', included: false },
        { text: 'Priority support', included: false },
        { text: 'Advanced components', included: false }
      ],
      cta: 'Start Free',
      highlighted: false
    },
    {
      name: 'Premium',
      icon: <Rocket className="w-6 h-6" />,
      price: { monthly: 29, yearly: 290 },
      description: 'For professionals and growing teams',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: 'Full components library', included: true },
        { text: 'HTML/CSS export', included: true },
        { text: 'React & Vue export', included: true },
        { text: 'Custom domains', included: true },
        { text: 'Team collaboration (5 users)', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Advanced components', included: true },
        { text: 'GitHub integration', included: true },
        { text: 'White-label export', included: false }
      ],
      cta: 'Start Premium',
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      name: 'Deluxe',
      icon: <Crown className="w-6 h-6" />,
      price: { monthly: 99, yearly: 990 },
      description: 'For agencies and enterprises',
      features: [
        { text: 'Everything in Premium', included: true },
        { text: 'Unlimited team members', included: true },
        { text: 'White-label export', included: true },
        { text: 'Custom component library', included: true },
        { text: 'API access', included: true },
        { text: 'SSO authentication', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'SLA guarantee', included: true }
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise accounts."
    },
    {
      question: "Is there a free trial for premium features?",
      answer: "Yes, all premium plans come with a 14-day free trial. No credit card required."
    },
    {
      question: "What happens to my projects if I downgrade?",
      answer: "Your projects remain safe. You'll need to archive some projects to fit within the new plan limits."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
              <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}>
                <TabsList className="bg-slate-800/50 border border-slate-700">
                  <TabsTrigger value="monthly" className="data-[state=active]:bg-purple-600">
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger value="yearly" className="data-[state=active]:bg-purple-600">
                    Yearly
                    <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30">
                      Save 20%
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.highlighted 
                    ? 'border-purple-500 shadow-2xl shadow-purple-500/20' 
                    : 'border-slate-700/50 hover:border-purple-500/50'
                }`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white">
                    {plan.badge}
                  </Badge>
                )}
                
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${
                    plan.highlighted ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700/50 text-gray-400'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">
                      ${billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.yearly / 12)}
                    </span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      ${plan.price.yearly} billed yearly
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We offer custom plans for large teams and enterprises with specific requirements.
            </p>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
              Contact Our Sales Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;