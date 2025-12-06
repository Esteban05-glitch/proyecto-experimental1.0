"use client";

import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
}

export function FilterBar({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
}: FilterBarProps) {
    return (
        <div className="sticky top-4 z-50 w-full max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-card/80 backdrop-blur-md border border-border/50 shadow-lg rounded-full p-2 flex flex-col sm:flex-row gap-2 items-center">

                {/* Search Input */}
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground/70"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => onSearchChange("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    )}
                </div>

                <div className="h-6 w-px bg-border hidden sm:block" />

                {/* Category Dropdown */}
                <div className="relative w-full sm:w-auto min-w-[150px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full appearance-none bg-transparent border-none focus:ring-0 pl-9 pr-8 py-2 text-sm cursor-pointer text-foreground"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
