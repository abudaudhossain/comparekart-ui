"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // Or just use className merge utility

interface ActionIconProps {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
    className?: string;
}

export default function ActionIcon({
    icon: Icon,
    label,
    onClick,
    className,
}: ActionIconProps) {
    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className={cn(
                    "p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition",
                    className
                )}
            >
                <Icon size={18} />
            </button>

            {/* Tooltip on hover */}
            <span className="absolute z-11 hidden  group-hover:block -top-5 -left-3 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-500 rounded whitespace-nowrap opacity-0 scale-95 translate-y-1 pointer-events-none
        group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
        transition-all duration-200 ease-out">
                {label}
            </span>
        </div>
    );
}
