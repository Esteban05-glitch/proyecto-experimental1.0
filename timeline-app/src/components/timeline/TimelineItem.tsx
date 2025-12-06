"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Calendar, Tag } from "lucide-react";

interface TimelineItemProps {
    event: TimelineEvent;
    index: number;
}

export function TimelineItem({ event, index }: TimelineItemProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "relative flex w-full items-center justify-between mb-8",
                isEven ? "flex-row-reverse" : "flex-row"
            )}
        >
            {/* Empty space for the other side */}
            <div className="w-5/12" />

            {/* Center Node */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg z-10" />
                <div className="absolute w-0.5 h-full bg-border -z-10 top-0" />
            </div>

            {/* Content Card */}
            <div className="w-5/12">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-card text-card-foreground p-6 rounded-lg shadow-md border border-border/50 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer"
                >
                    <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold mb-2 text-primary">
                        {event.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {event.description}
                    </p>

                    <div className="flex items-center gap-2 mt-auto">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            <Tag className="w-3 h-3" />
                            {event.category}
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
