"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Megaphone,
  BarChart,
  Settings,
  Link2,
  LogOut,
} from "lucide-react";
import { useTranslations } from "@/components/providers/DictonaryContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  submenu?: {
    title: string;
    href: string;
  }[];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { t, locale } = useTranslations();

  const sidebarItems: SidebarItem[] = [
    {
      title: "Overview",
      href: `/${locale}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      title: "Ads",
      href: `/${locale}/dashboard/ads`,
      icon: Megaphone,
      submenu: [
        { title: "Overview", href: `/${locale}/dashboard/ads/overview` },
        { title: "Campaigns", href: `/${locale}/dashboard/ads/campaigns` },
        { title: "Create", href: `/${locale}/dashboard/ads/create` },
        { title: "Assets", href: `/${locale}/dashboard/ads/assets` },
      ],
    },
    {
      title: "Connections",
      href: `/${locale}/dashboard/connections`,
      icon: Link2,
      submenu: [
        { title: "Google", href: `/${locale}/dashboard/connections/google` },
        {
          title: "Facebook",
          href: `/${locale}/dashboard/connections/facebook`,
        },
      ],
    },
    {
      title: "Analytics",
      href: `/${locale}/dashboard/analytics`,
      icon: BarChart,
      submenu: [
        { title: "Overview", href: `/${locale}/dashboard/analytics/overview` },
      ],
    },
    {
      title: "Settings",
      href: `/${locale}/dashboard/settings`,
      icon: Settings,
      submenu: [
        { title: "Billing", href: `/${locale}/dashboard/settings/billing` },
      ],
    },
  ];

  const toggleSubmenu = (href: string) => {
    setOpenSubmenu(openSubmenu === href ? null : href);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link href={`/${locale}/dashboard`}>
              <h1 className="text-2xl font-bold text-primary-100">AutoAds</h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <div
                    className={cn(
                      "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer",
                      pathname === item.href
                        ? "bg-primary-900 text-primary-100"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => item.submenu && toggleSubmenu(item.href)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                  </div>

                  {/* Submenu */}
                  {item.submenu && openSubmenu === item.href && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 ml-6 space-y-1"
                    >
                      {item.submenu.map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-2 text-sm rounded-lg",
                              pathname === subItem.href
                                ? "bg-primary-900 text-primary-100"
                                : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t">
            <Link href={`/${locale}/signout`}>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>{t("dashboard.logout")}</span>
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
