"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "@/lib/data";
import { cn, getEmbedUrl } from "@/lib/utils";
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
                "relative flex w-full items-center justify-between mb-8 timeline-item-content",
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
                    whileHover={{ y: -5 }}
                    className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                    {/* Media (Video/Audio/Image) */}
                    <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                        {event.mediaType === "video" && event.mediaUrl ? (
                            <div className="aspect-video w-full">
                                <iframe
                                    src={getEmbedUrl(event.mediaUrl) || event.mediaUrl}
                                    title={event.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : event.mediaType === "audio" && event.mediaUrl ? (
                            <div className="bg-secondary/30 p-4 flex flex-col items-center justify-center gap-2">
                                {event.imageUrl && (
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-24 h-24 object-cover rounded-full mb-2 shadow-sm"
                                    />
                                )}
                                <audio controls className="w-full">
                                    <source src={event.mediaUrl} />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        ) : event.imageUrl ? (
                            <div className="aspect-video w-full relative overflow-hidden">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-primary font-medium text-sm justify-end">
                        <span className="px-2 py-0.5 rounded-full bg-secondary/50 border border-border/50">
                            {event.category}
                        </span>
                        <span>{event.date}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold mb-2 text-foreground">{event.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {event.description}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
