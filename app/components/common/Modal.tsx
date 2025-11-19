"use client";

import React, { useEffect } from "react";
import Title from "./Title";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white text-black border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <Title title={title} size="h4" />
          <button
            onClick={onClose}
            className=" hover:text-gray-600 transition-colors text-black font-medium cursor-pointer"
          >
            Go Back
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
