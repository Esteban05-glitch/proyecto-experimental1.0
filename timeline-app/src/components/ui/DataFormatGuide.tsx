"use client";

import { useState } from "react";
import { Copy, FileJson, FileSpreadsheet, Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function DataFormatGuide() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"json" | "csv">("json");
    const [copied, setCopied] = useState(false);

    const jsonExample = `[
  {
    "title": "Event Title",
    "date": "YYYY-MM-DD",
    "description": "Event description...",
    "category": "Art",
    "imageUrl": "https://example.com/image.jpg",
    "mediaUrl": "https://youtube.com/watch?v=...",
    "mediaType": "video"
  }
]`;

    const csvExample = `title,date,description,category,imageUrl,mediaUrl
Event Title,2024-01-01,Description here,Science,https://img.com/1.jpg,https://youtu.be/xyz
Another Event,1990-05-20,Another description,Politics,,`;

    const handleCopy = () => {
        const text = activeTab === "json" ? jsonExample : csvExample;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center gap-2 w-full text-sm text-muted-foreground hover:text-primary transition-colors py-2"
            >
                <span>{isOpen ? "Hide Data Format Guide" : "Show Data Format Guide"}</span>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-card border border-border/50 rounded-xl p-6 mt-2 shadow-sm">
                            <div className="flex items-center gap-4 mb-4 border-b border-border/50 pb-2">
                                <button
                                    onClick={() => setActiveTab("json")}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                        activeTab === "json"
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <FileJson className="w-4 h-4" />
                                    JSON
                                </button>
                                <button
                                    onClick={() => setActiveTab("csv")}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                        activeTab === "csv"
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <FileSpreadsheet className="w-4 h-4" />
                                    CSV
                                </button>
                                <div className="ml-auto">
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {copied ? "Copied!" : "Copy Code"}
                                    </button>
                                </div>
                            </div>

                            <div className="relative bg-secondary/30 rounded-lg p-4 font-mono text-xs md:text-sm overflow-x-auto">
                                <pre className="text-foreground">
                                    {activeTab === "json" ? jsonExample : csvExample}
                                </pre>
                            </div>

                            <p className="text-xs text-muted-foreground mt-4 italic">
                                * Supported headers: title, date, description, category, imageUrl, mediaUrl (optional).
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
