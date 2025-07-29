"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Facebook,
  Check,
  RefreshCw,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";

interface FacebookAccount {
  id: string;
  name: string;
  email: string;
  status: "active" | "expired" | "error";
  lastSync: string;
  businessAccounts: {
    id: string;
    name: string;
    status: string;
    adAccounts: {
      id: string;
      name: string;
      status: string;
    }[];
  }[];
}

// Données de test (à remplacer par l'API)
const connectedAccount: FacebookAccount = {
  id: "1",
  name: "Business Manager",
  email: "business@example.com",
  status: "active",
  lastSync: "2024-01-15T10:30:00Z",
  businessAccounts: [
    {
      id: "123",
      name: "Main Business",
      status: "active",
      adAccounts: [
        {
          id: "456",
          name: "Main Ad Account",
          status: "active",
        },
        {
          id: "789",
          name: "Secondary Ad Account",
          status: "paused",
        },
      ],
    },
  ],
};

export default function FacebookConnectionPage() {
  const [isConnected, setIsConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConnect = async () => {
    // Implémenter la logique de connexion OAuth
    window.location.href = "/api/auth/facebook";
  };

  const handleDisconnect = async () => {
    // Implémenter la logique de déconnexion
    setIsConnected(false);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    // Implémenter la logique de synchronisation
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meta Ads</h1>
          <p className="text-gray-500">
            Connect your Meta Business Manager to manage Facebook & Instagram
            ads
          </p>
        </div>
        {isConnected ? (
          <Button variant="outline" onClick={handleDisconnect}>
            <Unlink className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        ) : (
          <Button onClick={handleConnect}>
            <Facebook className="h-4 w-4 mr-2" />
            Connect Meta Ads
          </Button>
        )}
      </div>

      {isConnected ? (
        <div className="space-y-6">
          {/* Connection Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Connected Account</h3>
                    <p className="text-gray-500">{connectedAccount.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSync}
                  disabled={isSyncing}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Last synced:{" "}
                {new Date(connectedAccount.lastSync).toLocaleString()}
              </div>
            </Card>
          </motion.div>

          {/* Business Accounts */}
          {connectedAccount.businessAccounts.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Card>
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{business.name}</h3>
                      <p className="text-sm text-gray-500">
                        Business Manager ID: {business.id}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        business.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {business.status}
                    </span>
                  </div>
                </div>
                <div className="divide-y">
                  {business.adAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="p-6 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-sm text-gray-500">
                          Ad Account ID: {account.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            account.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {account.status}
                        </span>
                        <Button variant="outline" size="sm">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Permissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Permissions</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Manage ads and campaigns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Access insights and analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Manage business assets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Access Instagram account data</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8 text-center">
            <Facebook className="h-16 w-16 mx-auto mb-6 text-[#1877F2]" />
            <h2 className="text-xl font-semibold mb-2">Connect to Meta Ads</h2>
            <p className="text-gray-500 mb-6">
              Link your Meta Business Manager to manage Facebook & Instagram ads
              directly from AutoAds
            </p>
            <Button onClick={handleConnect}>
              <Facebook className="h-4 w-4 mr-2" />
              Connect Meta Ads
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
