"use client";

import { useState } from "react";
import { Timeline } from "@/components/timeline/Timeline";
import { FileUpload } from "@/components/ui/FileUpload";
import { TimelineEvent } from "@/lib/data";
import { RotateCcw } from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero / Header Section */}
      <header className="py-20 text-center space-y-4 bg-gradient-to-b from-secondary/20 to-background border-b border-border/50">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary tracking-tight">
          Chronos
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
          A journey through time, exploring the pivotal moments that shaped our world.
        </p>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 min-h-[500px]">
        {events.length === 0 ? (
          <div className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <FileUpload onDataLoaded={setEvents} />

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground mb-4">Don't have a file? Try our demo data.</p>
              <button
                onClick={() => import("@/lib/data").then(m => setEvents(m.timelineData))}
                className="text-primary hover:underline underline-offset-4 text-sm font-medium"
              >
                Load Demo Timeline
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <div className="flex justify-end mb-4 pt-8">
              <button
                onClick={() => setEvents([])}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Upload New File
              </button>
            </div>
            <Timeline events={events} />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50 mt-20">
        <p>© 2025 Historical Archives. Preserving the past for the future.</p>
      </footer>
    </main>
  );
}
