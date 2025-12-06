"use client";

import { TimelineEvent } from "@/lib/data";
import { TimelineItem } from "./TimelineItem";

interface TimelineProps {
    events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
    return (
        <div className="relative max-w-5xl mx-auto py-20 px-4">
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

            <div className="flex flex-col gap-12">
                {events.map((event, index) => (
                    <TimelineItem key={event.id} event={event} index={index} />
                ))}
            </div>
        </div>
    );
}
