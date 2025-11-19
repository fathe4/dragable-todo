"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CheckSquare, User, LogOut, X } from "lucide-react";
import Image from "next/image";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <CheckSquare className="w-5 h-5" />,
  },
  {
    label: "Account Information",
    path: "/dashboard/account",
    icon: <User className="w-5 h-5" />,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 bg-[#0D224A] text-white min-h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 border-b border-blue-900/30">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-400 mb-4 overflow-hidden">
              <Image
                src="./vercel.svg"
                alt="User"
                className="w-full h-full object-cover"
                width={250}
                height={250}
              />
            </div>
            <h3 className="font-semibold text-lg">amanuel</h3>
            <p className="text-sm text-gray-400">amanuel@gmail.com</p>
          </div>
        </div>

        <nav className="flex-1 py-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                    flex items-center gap-4 px-8 py-4 relative overflow-hidden transition-all
                    ${
                      isActive
                        ? "text-white bg-white/5 rounded-r-xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent before:content-['']"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-blue-900/30">
          <button className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
