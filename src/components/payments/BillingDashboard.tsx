
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, CreditCard, Calendar, User, Settings, AlertTriangle } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

interface Subscription {
  plan: string;
  status: 'active' | 'canceled' | 'past_due';
  nextBilling: string;
  amount: string;
}

const mockInvoices: Invoice[] = [
  { id: 'INV-001', date: '2025-01-01', amount: '$29.00', status: 'paid', downloadUrl: '#' },
  { id: 'INV-002', date: '2024-12-01', amount: '$29.00', status: 'paid', downloadUrl: '#' },
  { id: 'INV-003', date: '2024-11-01', amount: '$29.00', status: 'paid', downloadUrl: '#' },
  { id: 'INV-004', date: '2024-10-01', amount: '$29.00', status: 'paid', downloadUrl: '#' },
];

const mockSubscription: Subscription = {
  plan: 'Pro',
  status: 'active',
  nextBilling: '2025-02-01',
  amount: '$29.00'
};

export const BillingDashboard = () => {
  const [subscription] = useState<Subscription>(mockSubscription);
  const [invoices] = useState<Invoice[]>(mockInvoices);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      paid: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30',
      canceled: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      past_due: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status === 'past_due' ? 'Past Due' : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Billing Dashboard</h1>
        <p className="text-lg text-slate-300">Manage your subscription and billing history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Overview */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Plan */}
          <Card className="bg-slate-900/60 backdrop-blur-xl border-slate-700 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Current Plan
              </h2>
              {getStatusBadge(subscription.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-slate-400 text-sm mb-1">Plan</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {subscription.plan}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Monthly Cost</p>
                <p className="text-xl font-semibold text-slate-100">{subscription.amount}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Next Billing</p>
                <p className="text-slate-200 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(subscription.nextBilling).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 focus:ring-2 focus:ring-purple-500">
                Upgrade Plan
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-500">
                <Settings className="w-4 h-4 mr-2" />
                Manage Subscription
              </Button>
            </div>
          </Card>

          {/* Billing History */}
          <Card className="bg-slate-900/60 backdrop-blur-xl border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Billing History</h2>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">Invoice</TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Amount</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell className="text-slate-200 font-medium">{invoice.id}</TableCell>
                      <TableCell className="text-slate-200">
                        {new Date(invoice.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-slate-200">{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-500"
                          onClick={() => window.open(invoice.downloadUrl, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Method */}
          <Card className="bg-slate-900/60 backdrop-blur-xl border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </h3>
            
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-200 font-medium">•••• •••• •••• 4242</span>
                <span className="text-slate-400 text-sm">Visa</span>
              </div>
              <p className="text-slate-400 text-sm">Expires 12/28</p>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-slate-600 text-slate-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-500"
            >
              Update Payment Method
            </Button>
          </Card>

          {/* Account Info */}
          <Card className="bg-slate-900/60 backdrop-blur-xl border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Info
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-slate-200">user@example.com</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Customer ID</p>
                <p className="text-slate-200 font-mono text-sm">cus_12345678</p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4 border-slate-600 text-slate-200 hover:bg-slate-800 focus:ring-2 focus:ring-slate-500"
            >
              Update Account
            </Button>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-red-500/10 backdrop-blur-xl border-red-500/30 p-6">
            <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </h3>
            
            <p className="text-slate-300 text-sm mb-4">
              Cancel your subscription. This action cannot be undone.
            </p>

            <Button 
              variant="outline" 
              className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 focus:ring-2 focus:ring-red-500"
            >
              Cancel Subscription
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
