"use client"
import React, { useState } from 'react';
import { BarChart3, Target, Users, TrendingUp } from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  status: 'Active' | 'En Pause' | 'Terminée';
  budget: number;
  spent: number;
  roi: number;
}

interface KPI {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Données factices pour les KPIs
  const kpis: KPI[] = [
    {
      label: 'Coût par Clic (CPC)',
      value: '$0.75',
      change: '-5%',
      isPositive: true
    },
    {
      label: 'Leads Générés',
      value: '150',
      change: '+10%',
      isPositive: true
    },
    {
      label: 'Taux de Conversion',
      value: '5%',
      change: '+2%',
      isPositive: true
    }
  ];

  // Données factices pour les campagnes
  const campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Campagne 1: Promotion d\'Été',
      status: 'Active',
      budget: 500,
      spent: 450,
      roi: 120
    },
    {
      id: 2,
      name: 'Campagne 2: Offre Spéciale',
      status: 'En Pause',
      budget: 300,
      spent: 280,
      roi: 110
    },
    {
      id: 3,
      name: 'Campagne 3: Nouveaux Produits',
      status: 'Terminée',
      budget: 400,
      spent: 380,
      roi: 105
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'En Pause':
        return 'text-yellow-600 bg-yellow-100';
      case 'Terminée':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3, active: true },
    { id: 'campaigns', label: 'Campagnes', icon: Target },
    { id: 'audiences', label: 'Audiences', icon: Users },
    { id: 'reports', label: 'Rapports', icon: TrendingUp },
    { id: 'help', label: 'Aide', icon: null }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AutoAds</span>
          </div>
        </div>
        
        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  item.id === 'dashboard' ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
                }`}
              >
                {Icon && <Icon className="w-5 h-5 mr-3" />}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
            <p className="text-gray-600">Vue d'ensemble des performances de vos campagnes publicitaires</p>
          </div>

          {/* Budget Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Budget vs Dépenses et ROI</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">$1,250</span>
                  <span className="text-sm text-blue-600">30 derniers jours +15%</span>
                </div>
              </div>
            </div>
            
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />
                
                {/* Area fill */}
                <path
                  d="M 50 120 Q 150 80 200 100 T 350 110 Q 450 130 500 160 Q 600 100 650 80 Q 700 90 750 70 L 750 180 L 50 180 Z"
                  fill="#EBF4FF"
                  opacity="0.3"
                />
                
                {/* Line */}
                <path
                  d="M 50 120 Q 150 80 200 100 T 350 110 Q 450 130 500 160 Q 600 100 650 80 Q 700 90 750 70"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Data points */}
                {[
                  { x: 50, y: 120 },
                  { x: 200, y: 100 },
                  { x: 350, y: 110 },
                  { x: 500, y: 160 },
                  { x: 650, y: 80 },
                  { x: 750, y: 70 }
                ].map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#3B82F6"
                    className="opacity-0 hover:opacity-100 transition-opacity"
                  />
                ))}
                
                {/* X-axis labels */}
                <text x="50" y="195" textAnchor="middle" className="text-xs fill-gray-400">1</text>
                <text x="200" y="195" textAnchor="middle" className="text-xs fill-gray-400">7</text>
                <text x="350" y="195" textAnchor="middle" className="text-xs fill-gray-400">14</text>
                <text x="500" y="195" textAnchor="middle" className="text-xs fill-gray-400">21</text>
                <text x="650" y="195" textAnchor="middle" className="text-xs fill-gray-400">28</text>
              </svg>
            </div>
          </div>

          {/* KPIs */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Indicateurs Clés de Performance (KPIs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {kpis.map((kpi, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">{kpi.label}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                    <span className={`text-sm font-medium ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Management */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Gestion des Campagnes</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom de la Campagne
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dépenses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROI
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {campaign.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        ${campaign.budget}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        ${campaign.spent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.roi}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          {campaign.status === 'Active' ? (
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              Pause
                            </button>
                          ) : campaign.status === 'En Pause' ? (
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              Reprendre
                            </button>
                          ) : (
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              Supprimer
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;