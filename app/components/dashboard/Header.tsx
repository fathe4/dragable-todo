"use client";

import React from "react";
import { Bell, Calendar, Menu } from "lucide-react";
import Image from "next/image";
import Config from "@/app/common/Config/Config";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-14 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <Image src={"./logo.svg"} width={100} height={100} alt="logo" />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="px-3 md:px-4 py-3 hover:bg-[#3754d3] rounded-lg transition-colors bg-[#5272FF] ">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <div className="flex w-40 gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-[#5272FF] hover:bg-[#3754d3] px-3 md:px-4 py-3 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm font-medium">{today}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
