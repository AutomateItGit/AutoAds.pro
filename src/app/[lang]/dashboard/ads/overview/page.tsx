"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";

// Données de test (à remplacer par les vraies données de l'API)
const data = [
  { name: "Jan", spend: 4000, conversions: 240 },
  { name: "Feb", spend: 3000, conversions: 198 },
  { name: "Mar", spend: 2000, conversions: 980 },
  { name: "Apr", spend: 2780, conversions: 908 },
  { name: "May", spend: 1890, conversions: 800 },
  { name: "Jun", spend: 2390, conversions: 800 },
];

const platforms = [
  { value: "all", label: "All Platforms" },
  { value: "google", label: "Google Ads" },
  { value: "facebook", label: "Facebook Ads" },
];

const objectives = [
  { value: "all", label: "All Objectives" },
  { value: "awareness", label: "Brand Awareness" },
  { value: "traffic", label: "Website Traffic" },
  { value: "conversions", label: "Conversions" },
];

export default function AdsOverview() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [platform, setPlatform] = useState("all");
  const [objective, setObjective] = useState("all");

  // Stats cards avec animation
  const stats = [
    {
      title: "Total Spend",
      value: "$12,345",
      change: "+12%",
      isPositive: true,
    },
    {
      title: "Impressions",
      value: "1.2M",
      change: "+8%",
      isPositive: true,
    },
    {
      title: "Clicks",
      value: "45.2K",
      change: "-3%",
      isPositive: false,
    },
    {
      title: "Conversions",
      value: "2.1K",
      change: "+15%",
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Ads Overview</h1>
        <div className="flex gap-4">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={objective} onValueChange={setObjective}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Objective" />
            </SelectTrigger>
            <SelectContent>
              {objectives.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6">Spend vs Conversions</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="spend"
                  stroke="#1877F2"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversions"
                  stroke="#4CAF50"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6">Performance by Platform</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="spend" fill="#1877F2" />
                <Bar dataKey="conversions" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
