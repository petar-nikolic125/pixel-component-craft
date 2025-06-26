
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, Mail, User, MapPin } from 'lucide-react';

interface CheckoutFormProps {
  selectedPlan?: {
    name: string;
    price: string;
  };
  onComplete?: () => void;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export const CheckoutForm = ({ selectedPlan, onComplete }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US'
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiryMonth = 'Expiry date is required';
    }
    if (!formData.cvc || formData.cvc.length < 3) {
      newErrors.cvc = 'Valid CVC is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete?.();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <Card className="bg-slate-900/60 backdrop-blur-xl border-slate-700 p-8 h-fit">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Order Summary</h3>
          
          {selectedPlan && (
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-slate-700">
                <span className="text-slate-200">{selectedPlan.name} Plan</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {selectedPlan.price}{selectedPlan.price !== 'Custom' && '/month'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Billing cycle</span>
                <span className="text-slate-200">Monthly</span>
              </div>
            </div>
          )}

          <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <Lock className="w-4 h-4" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed">
            Your subscription will renew automatically. Cancel anytime from your account settings.
          </div>
        </Card>

        {/* Checkout Form */}
        <Card className="bg-slate-900/60 backdrop-blur-xl border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Payment Details</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </h4>
              
              <div>
                <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </h4>

              <div>
                <Label htmlFor="cardNumber" className="text-slate-200">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                  className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth" className="text-slate-200">Month</Label>
                  <Input
                    id="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryMonth: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="MM"
                    maxLength={2}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryYear" className="text-slate-200">Year</Label>
                  <Input
                    id="expiryYear"
                    value={formData.expiryYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryYear: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="YY"
                    maxLength={2}
                  />
                </div>
                <div>
                  <Label htmlFor="cvc" className="text-slate-200">CVC</Label>
                  <Input
                    id="cvc"
                    value={formData.cvc}
                    onChange={(e) => setFormData(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '') }))}
                    className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              {(errors.expiryMonth || errors.cvc) && (
                <p className="text-red-400 text-sm">{errors.expiryMonth || errors.cvc}</p>
              )}
            </div>

            {/* Billing Address */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Billing Address
              </h4>

              <div>
                <Label htmlFor="address" className="text-slate-200">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-slate-200">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="text-slate-200">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 py-3 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                `Complete Payment ${selectedPlan?.price && selectedPlan.price !== 'Custom' ? `• ${selectedPlan.price}/month` : ''}`
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
