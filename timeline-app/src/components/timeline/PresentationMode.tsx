"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEvent } from "@/lib/data";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface PresentationModeProps {
    events: TimelineEvent[];
    onClose: () => void;
}

export function PresentationMode({ events, onClose }: PresentationModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1 < events.length ? prev + 1 : prev));
    }, [events.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev, onClose]);

    const currentEvent = events[currentIndex];

    return (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col">
            {/* Header / Controls */}
            <div className="flex items-center justify-between p-6 border-b border-border/20">
                <div className="text-sm font-medium text-muted-foreground">
                    Event {currentIndex + 1} of {events.length}
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
                {/* Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="absolute left-4 md:left-8 z-10 p-4 rounded-full bg-secondary/50 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === events.length - 1}
                    className="absolute right-4 md:right-8 z-10 p-4 rounded-full bg-secondary/50 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                {/* Slide Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentEvent.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        {/* Image Side */}
                        <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
                            {currentEvent.imageUrl ? (
                                <img
                                    src={currentEvent.imageUrl}
                                    alt={currentEvent.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary/20 text-muted-foreground">
                                    No Image Available
                                </div>
                            )}
                        </div>

                        {/* Text Side */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-accent text-lg font-medium">
                                <Calendar className="w-5 h-5" />
                                <span>{currentEvent.date}</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
                                {currentEvent.title}
                            </h2>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                                <Tag className="w-4 h-4" />
                                {currentEvent.category}
                            </div>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {currentEvent.description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-secondary w-full">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / events.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
}
