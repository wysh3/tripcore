"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  className = "",
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-4 mb-2 block">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/50 backdrop-blur-sm border border-black/5 rounded-2xl py-4 px-6 text-sm flex items-center justify-between group hover:border-black/10 transition-all duration-300"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute z-[100] w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden py-2"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-3 text-left text-sm hover:bg-[#f5f2ed] transition-colors flex items-center justify-between group"
                >
                  <span className={`${value === option.value ? "text-black font-medium" : "text-gray-500"}`}>
                    {option.label}
                  </span>
                  {value === option.value && (
                    <Check className="w-4 h-4 text-black" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
