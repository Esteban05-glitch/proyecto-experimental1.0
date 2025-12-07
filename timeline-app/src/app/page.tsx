"use client";

import { useState } from "react";
import { Timeline } from "@/components/timeline/Timeline";
import { FileUpload } from "@/components/ui/FileUpload";
import { FilterBar } from "@/components/ui/FilterBar";
import { TimelineEvent } from "@/lib/data";
import { RotateCcw } from "lucide-react";

import { PresentationMode } from "@/components/timeline/PresentationMode";
import { Play } from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPresenting, setIsPresenting] = useState(false);

  // Extract unique categories
  const categories = Array.from(new Set(events.map(e => e.category))).sort();

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Presentation Mode Overlay */}
      {isPresenting && filteredEvents.length > 0 && (
        <PresentationMode
          events={filteredEvents}
          onClose={() => setIsPresenting(false)}
        />
      )}

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
            <div className="flex flex-col items-center mb-8 pt-8 gap-4">
              <div className="w-full max-w-4xl flex justify-between items-center px-4">
                <button
                  onClick={() => setIsPresenting(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Presentation
                </button>

                <button
                  onClick={() => {
                    setEvents([]);
                    setSearchTerm("");
                    setSelectedCategory("");
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Upload New File
                </button>
              </div>

              <FilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
              />
            </div>

            {filteredEvents.length > 0 ? (
              <Timeline events={filteredEvents} />
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No events found matching your criteria.</p>
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory(""); }}
                  className="mt-2 text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
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
