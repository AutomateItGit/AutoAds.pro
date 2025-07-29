"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard, Download, Shield, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Données de test (à remplacer par l'API)
const subscriptionData = {
  plan: "Pro",
  status: "active",
  nextBilling: "2024-02-15",
  amount: "$15/month + 10% of ad spend",
  paymentMethod: {
    type: "card",
    last4: "4242",
    expiry: "12/24",
    brand: "Visa",
  },
};

const invoices = [
  {
    id: "INV-001",
    date: "2024-01-15",
    amount: "$165.00",
    status: "paid",
    period: "Jan 2024",
  },
  {
    id: "INV-002",
    date: "2023-12-15",
    amount: "$142.50",
    status: "paid",
    period: "Dec 2023",
  },
  // ... plus d'invoices
];

const usageData = {
  currentPeriod: {
    adSpend: 1500,
    campaigns: 8,
    assets: 45,
  },
  limits: {
    campaigns: 10,
    assets: 50,
  },
};

export default function BillingPage() {
  const [isUpdatingCard, setIsUpdatingCard] = useState(false);

  const handleUpdateCard = () => {
    // Implémenter la logique de mise à jour de la carte
    setIsUpdatingCard(true);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // Implémenter la logique de téléchargement
    console.log("Downloading invoice:", invoiceId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Usage</h1>
        <p className="text-gray-500">Manage your subscription and billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Current Plan</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{subscriptionData.plan}</p>
                  <p className="text-sm text-gray-500">
                    {subscriptionData.amount}
                  </p>
                </div>
                <Button>Upgrade Plan</Button>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Next billing on{" "}
                {new Date(subscriptionData.nextBilling).toLocaleDateString()}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 mr-4 text-gray-400" />
                <div>
                  <p className="font-medium">
                    {subscriptionData.paymentMethod.brand} ending in{" "}
                    {subscriptionData.paymentMethod.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {subscriptionData.paymentMethod.expiry}
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={handleUpdateCard}>
                Update Payment Method
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Usage Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-6">Current Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Ad Spend This Month</p>
              <p className="text-2xl font-semibold">
                ${usageData.currentPeriod.adSpend}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Active Campaigns</p>
              <p className="text-2xl font-semibold">
                {usageData.currentPeriod.campaigns}/{usageData.limits.campaigns}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Media Assets</p>
              <p className="text-2xl font-semibold">
                {usageData.currentPeriod.assets}/{usageData.limits.assets}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Billing History</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      {new Date(invoice.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{invoice.period}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadInvoice(invoice.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>

      {/* Security Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-blue-50">
          <div className="flex items-start space-x-4">
            <Shield className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900">Secure Payments</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your payment information is encrypted and securely processed by
                Stripe. We never store your full card details on our servers.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
