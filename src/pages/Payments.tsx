
import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { PlansComparison } from '@/components/payments/PlansComparison';
import { CheckoutForm } from '@/components/payments/CheckoutForm';
import { BillingDashboard } from '@/components/payments/BillingDashboard';

type ViewMode = 'plans' | 'checkout' | 'billing';

const Payments = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('plans');
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);

  const handleSelectPlan = (planName: string, price: string) => {
    setSelectedPlan({ name: planName, price });
    if (planName === 'Enterprise') {
      // For enterprise, redirect to contact
      window.open('mailto:sales@componentforge.com?subject=Enterprise Plan Inquiry', '_blank');
    } else {
      setViewMode('checkout');
    }
  };

  const handleCheckoutComplete = () => {
    setViewMode('billing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-purple-500/8 to-blue-500/8 rounded-full blur-3xl"></div>
      </div>

      <Navigation />

      {/* Navigation Tabs */}
      <div className="relative pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-xl p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('plans')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    viewMode === 'plans'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  Plans
                </button>
                <button
                  onClick={() => setViewMode('checkout')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    viewMode === 'checkout'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  disabled={!selectedPlan}
                >
                  Checkout
                </button>
                <button
                  onClick={() => setViewMode('billing')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    viewMode === 'billing'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  Billing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {viewMode === 'plans' && (
          <PlansComparison onSelectPlan={handleSelectPlan} />
        )}
        
        {viewMode === 'checkout' && (
          <CheckoutForm 
            selectedPlan={selectedPlan || undefined} 
            onComplete={handleCheckoutComplete}
          />
        )}
        
        {viewMode === 'billing' && (
          <BillingDashboard />
        )}
      </div>

      {/* Footer */}
      <footer className="relative border-t border-slate-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-400">
            <p>&copy; 2025 ComponentForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Payments;
