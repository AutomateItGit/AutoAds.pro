"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  Settings,
  BarChart,
  Target,
  Users,
  DollarSign,
  Plus,
} from "lucide-react";
import { useParams } from "next/navigation";

// Données de test (à remplacer par l'API)
const campaignData = {
  id: "1",
  name: "Summer Sale 2024",
  platform: "facebook",
  status: "active",
  budget: "$1,000",
  spent: "$450",
  objective: "conversions",
  startDate: "2024-01-01",
  endDate: "2024-03-31",
  audience: {
    locations: ["United States", "Canada"],
    ageRange: "25-54",
    interests: ["E-commerce", "Online Shopping"],
    gender: "All",
  },
  performance: {
    impressions: "45K",
    clicks: "1.2K",
    ctr: "2.67%",
    conversions: "125",
    cpa: "$3.60",
  },
};

const performanceData = [
  { date: "2024-01-01", impressions: 1000, clicks: 50, conversions: 5 },
  { date: "2024-01-02", impressions: 1200, clicks: 65, conversions: 8 },
  { date: "2024-01-03", impressions: 900, clicks: 45, conversions: 4 },
  // ... plus de données
];

const adSets = [
  {
    id: "1",
    name: "Main Ad Set",
    status: "active",
    budget: "$500",
    results: "78 conversions",
  },
  {
    id: "2",
    name: "Secondary Ad Set",
    status: "active",
    budget: "$500",
    results: "47 conversions",
  },
];

export default function CampaignDetail() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Impressions",
      value: campaignData.performance.impressions,
      icon: Users,
    },
    {
      title: "Clicks",
      value: campaignData.performance.clicks,
      icon: Target,
    },
    {
      title: "CTR",
      value: campaignData.performance.ctr,
      icon: BarChart,
    },
    {
      title: "CPA",
      value: campaignData.performance.cpa,
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {campaignData.name}
          </h1>
          <p className="text-gray-500">Campaign ID: {params.campaignId}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="icon">
            {campaignData.status === "active" ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary-900 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary-100" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="adsets">Ad Sets</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-6">Performance Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="#1877F2"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#4CAF50"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="#FFA726"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="adsets" className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Ad Sets</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ad Set
                </Button>
              </div>
              <div className="divide-y">
                {adSets.map((adSet) => (
                  <div
                    key={adSet.id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium">{adSet.name}</h4>
                      <p className="text-sm text-gray-500">
                        Budget: {adSet.budget}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {adSet.results}
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-6">Audience Settings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Locations</h4>
                <p className="text-gray-600">
                  {campaignData.audience.locations.join(", ")}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Age Range</h4>
                <p className="text-gray-600">
                  {campaignData.audience.ageRange}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Interests</h4>
                <p className="text-gray-600">
                  {campaignData.audience.interests.join(", ")}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Gender</h4>
                <p className="text-gray-600">{campaignData.audience.gender}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-6">Campaign Settings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Campaign Objective</h4>
                <p className="text-gray-600">{campaignData.objective}</p>
              </div>
              <div>
                <h4 className="font-medium">Budget</h4>
                <p className="text-gray-600">{campaignData.budget}</p>
              </div>
              <div>
                <h4 className="font-medium">Duration</h4>
                <p className="text-gray-600">
                  {campaignData.startDate} to {campaignData.endDate}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
