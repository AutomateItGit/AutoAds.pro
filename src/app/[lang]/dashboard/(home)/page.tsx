"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useTranslations } from "@/components/providers/DictonaryContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Données de test pour les graphiques
const performanceData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];

const campaignData = [
  { name: "Campaign A", impressions: 4000, clicks: 2400 },
  { name: "Campaign B", impressions: 3000, clicks: 1398 },
  { name: "Campaign C", impressions: 2000, clicks: 9800 },
  { name: "Campaign D", impressions: 2780, clicks: 3908 },
];

export default function DashboardHome() {
  const { t } = useTranslations();
  const [timeRange, setTimeRange] = useState("7d");

  // Statistiques de test
  const stats = [
    {
      title: "Total Impressions",
      value: "2.4M",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Total Clicks",
      value: "120K",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Spend",
      value: "$15,240",
      change: "-2.4%",
      trend: "down",
      icon: DollarSign,
    },
    {
      title: "ROAS",
      value: "3.2x",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's your ads overview.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-gray-600" />
                </div>
                <span
                  className={cn(
                    "flex items-center text-sm font-medium",
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 ml-1" />
                  )}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique de performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Performance Overview
            </h3>
            <Button variant="outline" size="sm">
              Download Report
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="rgb(59, 130, 246)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="rgb(59, 130, 246)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Graphique des campagnes */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Campaign Performance
            </h3>
            <Button variant="outline" size="sm">
              View All Campaigns
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="impressions" fill="#3B82F6" />
                <Bar dataKey="clicks" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Section des campagnes actives */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Active Campaigns
          </h3>
          <Button>Create Campaign</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-4 font-medium text-gray-600">Campaign</th>
                <th className="pb-4 font-medium text-gray-600">Status</th>
                <th className="pb-4 font-medium text-gray-600">Budget</th>
                <th className="pb-4 font-medium text-gray-600">Impressions</th>
                <th className="pb-4 font-medium text-gray-600">Clicks</th>
                <th className="pb-4 font-medium text-gray-600">CTR</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Summer Sale 2024",
                  status: "Active",
                  budget: "$1,200",
                  impressions: "45,678",
                  clicks: "3,456",
                  ctr: "7.56%",
                },
                {
                  name: "New Product Launch",
                  status: "Active",
                  budget: "$2,500",
                  impressions: "89,012",
                  clicks: "6,789",
                  ctr: "7.62%",
                },
                {
                  name: "Brand Awareness",
                  status: "Active",
                  budget: "$800",
                  impressions: "23,456",
                  clicks: "1,234",
                  ctr: "5.26%",
                },
              ].map((campaign, index) => (
                <tr
                  key={campaign.name}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-4">
                    <div className="font-medium text-gray-900">
                      {campaign.name}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-900">{campaign.budget}</td>
                  <td className="py-4 text-gray-900">{campaign.impressions}</td>
                  <td className="py-4 text-gray-900">{campaign.clicks}</td>
                  <td className="py-4 text-gray-900">{campaign.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
