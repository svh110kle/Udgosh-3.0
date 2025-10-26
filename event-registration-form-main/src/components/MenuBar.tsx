import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, UserPlus, LogIn, Info } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface MenuBarProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function MenuBar({ isVisible, onToggle }: MenuBarProps) {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Home",
      icon: Home,
      action: () => navigate("/"),
    },
    {
      label: "Register",
      icon: UserPlus,
      action: () => navigate("/register"),
    },
    {
      label: "Login",
      icon: LogIn,
      action: () => navigate("/auth"),
    },
    {
      label: "About",
      icon: Info,
      action: () => {
        // You can add an about page or modal here
        console.log("About clicked");
      },
    },
  ];

  return (
    <>
      {/* Toggle Button - Fixed position */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-lg hover:bg-white transition-colors"
        onClick={onToggle}
        aria-label="Toggle Menu"
      >
        {isVisible ? (
          <X className="h-5 w-5 text-gray-700" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700" />
        )}
      </motion.button>

      {/* Menu Bar - Animated slide in/out */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-xl z-40"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-left hover:bg-gray-100"
                        onClick={item.action}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </Button>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-sm text-gray-500 text-center">
                  Udgosh 3.0 Event Registration
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay - Click outside to close */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>
    </>
  );
}

