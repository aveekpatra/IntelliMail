"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, CreditCard, User } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/settings/accounts",
      label: "Email Accounts",
      icon: <Mail className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings/profile",
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings/billing",
      label: "Billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-64">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
